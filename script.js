// 学部名 / 学科名 対応表
const DEPARTMENT_MAP = {
  1: "高度情報処理学科",
};

// input要素の取得
const inputName = document.getElementById("name");
const inputNameKana = document.getElementById("nameKana");
const inputDepartment = document.getElementById("department");
const inputGrade = document.getElementById("grade");
const downloadButton = document.getElementById("downloadButton");

function updateCanvas() {
  const name = inputName.value;
  const nameKana = inputNameKana.value;
  const department = inputDepartment.value;
  const grade = inputGrade.value;
  const departmentString = `IT学部 ${
    DEPARTMENT_MAP[department] || department
  } ${grade}年`;

  console.log(name, nameKana, department, grade, departmentString);

  ctx.fillStyle = "#ffffff"; // 背景色を白に設定
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawBackgroundImage();
  drawName(name);
  drawNameKana(nameKana);
  drawDepartment(departmentString);
}

inputName.addEventListener("input", updateCanvas);
inputNameKana.addEventListener("input", updateCanvas);
inputDepartment.addEventListener("input", updateCanvas);
inputGrade.addEventListener("input", updateCanvas);

// キャンバスの取得と設定
const ratio = devicePixelRatio || 1;
const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

// キャンバスのサイズを適切に設定する
function initializeCanvas() {
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
}

// 背景画像の読み込み
function drawBackgroundImage() {
  const backgroundImage = new Image();
  backgroundImage.src = "img/ZoomBackground_base_2.png";

  backgroundImage.onload = () => {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    drawOrgnizationLogo();
  };
}

// 名前の描画
function drawName(nameString) {
  const nameFontSize = 36 * ratio;
  ctx.font = `900 ${nameFontSize}px "GenShinGothic"`;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#333333";

  // Position name on right side
  ctx.fillText(nameString, canvas.width - 20, canvas.height / 2 - 20 * ratio);
}

// 名前カナの描画
function drawNameKana(nameKanaString) {
  const nameKanaFontSize = 18 * ratio;
  ctx.font = `900 ${nameKanaFontSize}px "GenShinGothic"`;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#333333";

  // Position name on right side
  ctx.fillText(
    nameKanaString,
    canvas.width - 20,
    canvas.height / 2 + 30 + nameKanaFontSize / 2 - 20 * ratio
  );
}

// 学科の描画
function drawDepartment(departmentString) {
  const departmentFontSize = 24 * ratio;
  ctx.font = `900 ${departmentFontSize}px "GenShinGothic"`;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#333333";

  // Position name on right side
  ctx.fillText(departmentString, canvas.width - 20, 30);
}

// キャンバスに学校ロゴを描画
function drawOrgnizationLogo() {
  const schoolLogo = new Image();
  schoolLogo.src = "img/HAL_logo.png";
  schoolLogo.onload = () => {
    const LOGO_SCALE = 0.35; // ロゴのスケール
    const LOGO_HEIGHT = 102 * ratio * LOGO_SCALE;
    const LOGO_WIDTH = LOGO_HEIGHT * (schoolLogo.width / schoolLogo.height); // ロゴの幅
    const LOGO_MARGIN = 20 * ratio; // ロゴのマージン

    console.log("Logo loaded", LOGO_WIDTH, LOGO_HEIGHT);
    ctx.drawImage(
      schoolLogo,
      canvas.width - LOGO_WIDTH - LOGO_MARGIN,
      canvas.height - LOGO_HEIGHT - LOGO_MARGIN,
      LOGO_WIDTH,
      LOGO_HEIGHT
    );
  };
}

// 再描画処理
window.addEventListener("resize", handleResize);
function handleResize() {
  initializeCanvas();
  drawBackgroundImage(); // 再描画
}

// 初期化処理
initializeCanvas();
drawBackgroundImage();
updateCanvas(); // 初期値を描画

// ダウンロードボタンの処理
downloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "zoom_background.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
