# SoundBoard Pro v20 - README

Sick of Premiere Composer's 500 SFX limit? I built **SoundBoard Pro v20** to fix that!

When I started using Premiere Composer, I realized the free version limits you to showing only 500 sound effects—you couldn't add more. Frustrated by this restriction, I built this extension for my own workflow. Here, you can organize and load as many SFX files as you want with zero limits.

---

### 🚀 Key Features (v20)

* **Unlimited SFX:** Store and browse unlimited audio files without any 500-item cap.
* **VS Code Style Folder Tree:** Clean folder tree navigation on the left panel displaying live file counts for each directory. Features a responsive, resizable splitter bar.
* **One-Click Instant ADD:** Insert sound effects directly into your Premiere Pro timeline with a single click.
* **Dynamic Track Space Allocation (No Overlap):** Automatically detects existing audio clips at the playhead position and places the new SFX on the next available free audio track—ensuring no existing audio is ever overwritten or deleted.
* **Real Waveform & Timecode Display:** Real-time audio waveform preview with click/drag playhead scrubbing (seek) and millisecond-accurate timecode readout.
* **Global Instant Search:** Instant, dynamic search across all connected root folders to find any SFX in seconds.
* **Favorites & Custom Remarks:** Mark your favorite sound effects and rename/remark them inside the plugin without altering the original file names on your drive.
* **Integrated Trash Bin System:** Accidental removals won't lose your setup. Restore removed folders or files anytime via the dedicated Trash Bin tab.
* **Smart Keyboard Shortcuts:** Quick preview navigation when focused—press `Spacebar` to play/pause, and use `Left / Right Arrow` keys for frame-by-frame seeking.
* **Powered by Rayhan3030**

---

### 🛠️ Installation Guide

**Step 1:** Extract the downloaded ZIP file. You will find 3 items inside:

* `com.rayhan.soundboardpro` (Folder)
* `Enable Debug PR.bat` (Batch File)
* `README.md` (Documentation)

**Step 2:** Right-click on `Enable Debug PR.bat` and select **Run as administrator**. Click Continue if prompted, then close it. This enables Adobe CEP Debug Mode so Premiere Pro can load custom unsigned extensions.

**Step 3:** Copy the `com.rayhan.soundboardpro` folder and paste it into your Premiere Pro CEP extensions directory:

> `...\Adobe Premiere Pro [YOUR_VERSION]\CEP\extensions\`

*(If the `CEP` or `extensions` folders do not exist, create them manually with the exact same names).*

**Example Paths:**

* `C:\Program Files\Adobe\Adobe Premiere Pro 2025\CEP\extensions\`
* `D:\Adobe\Premiere.Pro.2025\Installations\Adobe Premiere Pro 2025\CEP\extensions\`

**Step 4:** Restart Adobe Premiere Pro (or open it if it was closed).

**Step 5:** Navigate to `Window > Extensions > SoundBoard Pro` in Premiere Pro to launch the extension.

---

### 🎮 How to Use

1. Once opened, click the **`📁 Add Main Folder`** button at the top bar.
2. Select your main SFX directory on your drive (e.g., `D:\SFX` or wherever your Whoosh, Impact, and Transition folders are stored).
3. All directories will instantly map into a VS Code-style folder tree on the left sidebar.
4. Click any folder to display its audio files on the right pane.
5. Click on any sound file to play it—the waveform and timecode will render automatically at the bottom.
6. Click **`ADD`** to place the audio clip right onto your active Premiere Pro timeline.

> **Note:** Tested and compatible with Adobe Premiere Pro CC 2022 through Premiere Pro 2026.
