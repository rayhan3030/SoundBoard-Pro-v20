/*
    SoundBoard Pro V15.3 - ExtendScript Host Engine
    Fixed Path Resolution & Direct Timeline Insertion
*/

function importSFXToTimeline(filePath) {
    try {
        var sequence = app.project.activeSequence;
        if (!sequence) {
            alert("No active sequence found! Please open or click on your sequence in the timeline first.");
            return "NO_SEQUENCE";
        }

        // Standardize path for ExtendScript File Object
        var cleanPath = filePath.toString().replace(/\\/g, "/");
        var fileToImport = new File(cleanPath);

        if (!fileToImport.exists) {
            alert("Audio file not found at path:\n" + cleanPath);
            return "FILE_NOT_FOUND";
        }

        var rootBin = app.project.rootItem;
        var initialNumItems = rootBin.children.numItems;

        // Import file into project root bin
        var importArray = [fileToImport.fsName];
        var importResult = app.project.importFiles(importArray, true, rootBin, false);

        if (!importResult) {
            alert("Failed to import audio file into Premiere Project Bin.");
            return "IMPORT_FAILED";
        }

        // Retrieve newly imported item
        var projectItem = null;
        var attempts = 0;
        while (attempts < 50) {
            if (rootBin.children.numItems > initialNumItems) {
                projectItem = rootBin.children[rootBin.children.numItems - 1];
                break;
            }
            $.sleep(10);
            attempts++;
        }

        if (!projectItem) {
            alert("Could not register imported sound in Premiere Project Bin.");
            return "ITEM_REGISTRATION_FAILED";
        }

        // Calculate Playhead Position and Space Window
        var playheadTime = sequence.getPlayerPosition();
        var playheadSec = playheadTime.seconds;

        var duration = 1.0;
        try {
            duration = projectItem.getOutPoint().seconds - projectItem.getInPoint().seconds;
            if (isNaN(duration) || duration <= 0) {
                duration = 1.0;
            }
        } catch (e) {
            duration = 1.0;
        }

        var targetTimeEnd = playheadSec + duration;

        // Smart Collision Check Across Audio Tracks
        var targetTrackIndex = -1;
        var audioTracks = sequence.audioTracks;
        var numTracks = audioTracks.numTracks;

        for (var i = 0; i < numTracks; i++) {
            var track = audioTracks[i];
            if (track.isMuted && track.isMuted()) continue;

            var isSpaceAvailable = true;
            var numClips = track.clips.numItems;

            for (var c = 0; c < numClips; c++) {
                var clip = track.clips[c];
                var clipStart = clip.start.seconds;
                var clipEnd = clip.end.seconds;

                // Check overlap with existing clips at playhead
                if (!(targetTimeEnd <= clipStart || playheadSec >= clipEnd)) {
                    isSpaceAvailable = false;
                    break;
                }
            }

            if (isSpaceAvailable) {
                targetTrackIndex = i;
                break;
            }
        }

        // Fallback: If all current tracks are overlapping, place on the last audio track
        if (targetTrackIndex === -1) {
            targetTrackIndex = numTracks - 1;
        }

        // Insert clip onto timeline
        var targetTrack = audioTracks[targetTrackIndex];
        targetTrack.insertClip(projectItem, playheadTime);

        return "SUCCESS";
    } catch (err) {
        alert("ExtendScript Error: " + err.toString());
        return "ERROR";
    }
}