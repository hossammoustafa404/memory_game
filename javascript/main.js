function showUsername(username) {
  let usernameField = document.querySelector(".username");
  usernameField.innerHTML = username || "Unknown";
}

function getGamePage(gamePage) {
  gamePage.classList.add("go-up");
}

function getRandOrderArray(range) {
  let randArray = [];
  let order = "";

  while (randArray.length != range) {
    order = Math.floor(Math.random() * range);
    if (!randArray.includes(order)) {
      randArray.push(order);
    }
  }

  return randArray;
}

function shuffleBlocks(blocks) {
  let randOrders = getRandOrderArray(blocks.length);

  for (let i = 0; i < blocks.length; i++) {
    blocks[i].style.order = randOrders[i];
  }
}

function hideCover(btn) {
  btn.parentElement.classList.add("hide");
}

function showblocks(blocks) {
  setTimeout(() => {
    notClickable(blocks, null, true);
    blocks.forEach((block) => {
      block.classList.add("rotate");
    });
  }, 100);
}

function hideBlocks(blocks) {
  setTimeout(() => {
    blocks.forEach((block) => {
      block.classList.remove("rotate");
    });
    makeClickable(blocks);
  }, 1500);
}

function rotateBlock(block) {
  block.classList.add("rotate");
}

function notClickable(blocks, openedBlocksArr, isStart) {
  if (isStart) {
    blocks.forEach((block) => {
      block.classList.add("not-clickable");
    });
  } else {
    blocks.forEach((block) => {
      if (block != openedBlocksArr[0] && block != openedBlocksArr[1]) {
        block.classList.add("not-clickable");
      }
    });
  }
}

function makeClickable(blocks) {
  blocks.forEach((block) => {
    block.classList.remove("not-clickable");
  });
}

function hideTwoBlocks(openedBlocksArr) {
  soundEffect(false);
  openedBlocksArr.forEach((block) => {
    setTimeout(() => {
      let blocks = document.querySelectorAll(".block");
      block.classList.remove("rotate");
      makeClickable(blocks);
    }, 500);
  });
}

function makeTry() {
  let triesSpace = document.querySelector(".tries");
  triesSpace.innerHTML++;
}

function notClickableForEver(openedBlocksArr) {
  openedBlocksArr.forEach((block) => {
    block.classList.add("not-clickable-forever");
  });
}

function soundEffect(isSuccess) {
  let effects = document.getElementsByTagName("audio");
  if (isSuccess) {
    let blocks = document.querySelectorAll(".block");

    effects[0].play();
    makeClickable(blocks);
  } else {
    effects[1].play();
  }
}
function checkBlocks(openedBlocksArr) {
  if (openedBlocksArr[0].dataset.animal != openedBlocksArr[1].dataset.animal) {
    hideTwoBlocks(openedBlocksArr);
    makeTry();
  } else {
    notClickableForEver(openedBlocksArr);
    soundEffect(true);
    return true;
  }
}
function showResult(startBtn) {
  startBtn.parentElement.classList.remove("hide");
  startBtn.parentElement.classList.add("appear");
  startBtn.innerHTML = "Play Again";
}

function gameManager() {
  let gamePage = document.querySelector(".game");
  let input = document.querySelector("#username");
  let goBtn = document.querySelector(".go");
  let startBtn = document.querySelector(".start");
  let blockParents = document.querySelectorAll(".block-parent");
  let blocks = document.querySelectorAll(".block");
  let openedBlocks = 0;
  let openedBlocksArr = [];
  let allOpened = 0;
  let effects = document.getElementsByTagName("audio");

  goBtn.addEventListener("click", () => {
    getGamePage(gamePage);
    showUsername(input.value);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      getGamePage(gamePage);
      showUsername(input.value);
    }
  });

  startBtn.addEventListener("click", () => {
    shuffleBlocks(blockParents);
    hideCover(startBtn);
    showblocks(blocks);
    hideBlocks(blocks);
  });

  blocks.forEach((block) => {
    block.addEventListener("click", () => {
      rotateBlock(block);
      block.classList.add("not-clickable");
      openedBlocksArr.push(block);
      openedBlocks++;
      console.log(openedBlocks);
      if (openedBlocks == 2) {
        effects[0].load();
        effects[1].load();
        notClickable(blocks, openedBlocksArr);
        if (checkBlocks(openedBlocksArr)) {
          allOpened++;
        }
        openedBlocks = 0;
        openedBlocksArr = [];
        if (allOpened == 10) {
          showResult(startBtn);
          effects[0].pause();
          effects[2].play();
        }
      }
    });
  });
}

gameManager();
