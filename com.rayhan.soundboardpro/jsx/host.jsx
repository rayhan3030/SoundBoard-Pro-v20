
function importSoundFile(p){ return importSoundFileSmart(p, 0); }
function importSoundFileSmart(p, durationSec){
    try{
        var pr = app.project;
        if(!pr) return "Error: No project open";
        var seq = pr.activeSequence;
        if(!seq) return "Error: No active sequence";
        var playhead = seq.getPlayerPosition();
        var playSec = 0;
        try{ playSec = playhead.seconds; }catch(e){ playSec = 0; }
        pr.importFiles([p], true, pr.rootItem, false);
        var importedItem = pr.rootItem.children[pr.rootItem.children.numItems-1];
        var durSec = durationSec;
        try{ if((durSec <= 0 || isNaN(durSec)) && importedItem.duration) durSec = importedItem.duration.seconds; }catch(e){}
        if(durSec <= 0 || isNaN(durSec)) durSec = 1.5;
        var newStart = playSec;
        var newEnd = playSec + durSec + 0.05;
        var freeTrackIndex = -1;
        var debugMsg = "Checking A tracks for ["+newStart.toFixed(2)+" - "+newEnd.toFixed(2)+"] dur "+durSec.toFixed(2)+"s\n";
        for(var t=0; t<seq.audioTracks.numTracks; t++){
            var track = seq.audioTracks[t];
            var isFree = true;
            var overlapInfo = "";
            try{
                for(var c=0; c<track.clips.numItems; c++){
                    var clip = track.clips[c];
                    try{
                        var cs = clip.start.seconds;
                        var ce = clip.end.seconds;
                        // Check if new clip overlaps existing clip
                        if(newStart < ce && newEnd > cs){
                            isFree=false;
                            overlapInfo = "Overlap with "+clip.name+" ["+cs.toFixed(2)+"-"+ce.toFixed(2)+"]";
                            break;
                        }
                    }catch(ie){}
                }
            }catch(te){ isFree=true; }
            debugMsg += "A"+(t+1)+": "+(isFree?"FREE":"BUSY "+overlapInfo)+"\n";
            if(isFree){ freeTrackIndex = t; break; }
        }
        if(freeTrackIndex == -1){
            return "BUSY:No free space! Clip needs "+durSec.toFixed(2)+"s from playhead. All A1-A"+seq.audioTracks.numTracks+" have overlap. Please add another audio track.\n"+debugMsg;
        }
        seq.audioTracks[freeTrackIndex].overwriteClip(importedItem, playhead.ticks);
        return "Added to A" + (freeTrackIndex+1) + " (Free Space "+durSec.toFixed(2)+"s checked): " + importedItem.name;
    }catch(e){ return "Error: " + e.message; }
}
