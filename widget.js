let video;
let command;
let cooldown;
let counter;

window.addEventListener('onWidgetLoad', init);
window.addEventListener('onEventReceived', onMessageReceived);

// Initialize the widget
function init(obj) {
  const fieldData = obj.detail.fieldData;
  video = document.getElementById('video');
  cooldown = fieldData['triggerCooldown'];
  counter = cooldown;
  
  prepCommand(fieldData['triggerCommand']);

  video.style.display = 'none';
  video.addEventListener('ended', videoFinished);
  
  window.setInterval(() => {
    counter++;
  }, 1000)
}

// Handle a new message
function onMessageReceived(obj) {
  if (counter < cooldown) { return; }

  if (obj.detail.listener === 'message') {
    const ev = obj["detail"]["event"];
    let text = ev.data.text;

    if (text === command) {
      playVideo();
    }
  }
}

// Ensure that the command is in the format we expect.
function prepCommand(cmd) {
  let tempCommand = cmd.replace('!', '');
  command = `!${tempCommand}`;
}

// Play the video
function playVideo() {
  counter = cooldown;
  video.style.display = 'block';
  video.play();
}

// Video has finished playback
function videoFinished() {
  counter = 0;
  video.style.display = 'none';
}