
    let recorder;
    let chunks = [];

    async function startRecording() {
      // ask for permission to capture the tab/screen
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 60 }
      });

      recorder = new MediaRecorder(stream, { mimeType: "video/webm" });

      recorder.ondataavailable = e => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "flipcard.webm";
        a.click();
        chunks = [];
      };

      recorder.start();
    }

    document.getElementById("start").onclick = startRecording;
    document.getElementById("stop").onclick = () => recorder.stop();