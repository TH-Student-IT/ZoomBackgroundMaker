// MARK: 定数
const DEPARTMENT_CHAR_SIZE = 30; // 学部名 / 学科名のフォントサイズ
const NAME_CHAR_SIZE = 36; // 名前のフォントサイズ
const NAME_KANA_CHAR_SIZE = 18;

const DEPARTMENT_MARGIN = 40; // 学部名 / 学科名のマージン
const NAME_KANA_MARGIN = 30; // 名前カナのマージン
const DEFAULT_MARGIN = 20; // 名前のマージン

const SCHOOL_LOGO_SCALE = 0.35; // ロゴのスケール

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
  const nameFontSize = NAME_CHAR_SIZE * ratio;
  ctx.font = `900 ${nameFontSize}px "GenShinGothic"`;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#333333";

  // Position name on right side
  ctx.fillText(
    nameString,
    canvas.width - DEFAULT_MARGIN,
    canvas.height / 2 - DEFAULT_MARGIN * ratio
  );
}

// 名前カナの描画
function drawNameKana(nameKanaString) {
  const nameKanaFontSize = NAME_KANA_CHAR_SIZE * ratio;
  ctx.font = `900 ${nameKanaFontSize}px "GenShinGothic"`;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#333333";

  // Position name on right side
  ctx.fillText(
    nameKanaString,
    canvas.width - DEFAULT_MARGIN,
    canvas.height / 2 +
      NAME_KANA_MARGIN +
      nameKanaFontSize / 2 -
      DEFAULT_MARGIN * ratio
  );
}

// 学科の描画
function drawDepartment(departmentString) {
  const departmentFontSize = DEPARTMENT_CHAR_SIZE * ratio;
  ctx.font = `900 ${departmentFontSize}px "GenShinGothic"`;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#333333";

  // Position name on right side
  ctx.fillText(
    departmentString,
    canvas.width - DEFAULT_MARGIN,
    DEPARTMENT_MARGIN
  );
}

// キャンバスに学校ロゴを描画
function drawOrgnizationLogo() {
  const LOGO_SCALE = SCHOOL_LOGO_SCALE; // ロゴのスケール
  const schoolLogo = new Image();
  schoolLogo.src = "img/HAL_logo.png";
  schoolLogo.onload = () => {
    const LOGO_HEIGHT = schoolLogo.height * ratio * LOGO_SCALE;
    const LOGO_WIDTH = LOGO_HEIGHT * (schoolLogo.width / schoolLogo.height); // ロゴの幅
    const LOGO_MARGIN = DEFAULT_MARGIN * ratio; // ロゴのマージン

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

// ダウンロードボタンの処理
downloadButton.addEventListener("click", () => {
  const UPSCALE_FACTOR = 1920 / canvas.width; // アップスケールの倍率
  const buffer = document.createElement("canvas");
  const bufferCtx = buffer.getContext("2d");
  buffer.width = 1920;
  buffer.height = 1080;
  bufferCtx.fillStyle = "#ffffff"; // 背景色を白に設定
  bufferCtx.fillRect(0, 0, buffer.width, buffer.height);

  const backgroundImage = new Image();
  backgroundImage.src = "img/ZoomBackground_base_2.png";
  backgroundImage.onload = () => {
    bufferCtx.drawImage(backgroundImage, 0, 0, buffer.width, buffer.height);

    const logo = new Image();
    logo.src = "img/HAL_logo.png";
    logo.onload = () => {
      const LOGO_SCALE = SCHOOL_LOGO_SCALE * UPSCALE_FACTOR; // ロゴのスケール
      const LOGO_HEIGHT = logo.height * ratio * LOGO_SCALE;
      const LOGO_WIDTH = LOGO_HEIGHT * (logo.width / logo.height); // ロゴの幅
      const LOGO_MARGIN = DEFAULT_MARGIN * ratio * UPSCALE_FACTOR; // ロゴのマージン

      bufferCtx.drawImage(
        logo,
        buffer.width - LOGO_WIDTH - LOGO_MARGIN,
        buffer.height - LOGO_HEIGHT - LOGO_MARGIN,
        LOGO_WIDTH,
        LOGO_HEIGHT
      );

      const department = inputDepartment.value;
      const grade = inputGrade.value;
      const departmentString = `IT学部 ${
        DEPARTMENT_MAP[department] || department
      } ${grade}年`;

      // Department text
      const departmentFontSize = DEPARTMENT_CHAR_SIZE * UPSCALE_FACTOR;
      bufferCtx.font = `900 ${departmentFontSize}px "GenShinGothic"`;
      bufferCtx.textAlign = "right";
      bufferCtx.textBaseline = "middle";
      bufferCtx.fillStyle = "#333333";
      bufferCtx.fillText(
        departmentString,
        buffer.width - DEFAULT_MARGIN * UPSCALE_FACTOR,
        DEPARTMENT_MARGIN * UPSCALE_FACTOR
      );

      // Name text
      const name = inputName.value;
      const nameFontSize = NAME_CHAR_SIZE * UPSCALE_FACTOR;
      bufferCtx.font = `900 ${nameFontSize}px "GenShinGothic"`;
      bufferCtx.fillText(
        name,
        buffer.width - DEFAULT_MARGIN * UPSCALE_FACTOR,
        buffer.height / 2 - DEFAULT_MARGIN * UPSCALE_FACTOR
      );

      // Name kana text
      const nameKana = inputNameKana.value;
      const nameKanaFontSize = NAME_KANA_CHAR_SIZE * UPSCALE_FACTOR;
      bufferCtx.font = `900 ${nameKanaFontSize}px "GenShinGothic"`;
      bufferCtx.fillText(
        nameKana,
        buffer.width - DEFAULT_MARGIN * UPSCALE_FACTOR,
        buffer.height / 2 +
          NAME_KANA_MARGIN * UPSCALE_FACTOR +
          nameKanaFontSize / 2 -
          DEFAULT_MARGIN * UPSCALE_FACTOR
      );

      // Create download link with high-resolution image
      const link = document.createElement("a");
      link.download = "zoom_background.png";
      link.href = buffer.toDataURL("image/png");
      link.click();
    };
  };
});

// モーダル機能のための変数
const termsLink = document.getElementById("termsLink");
const termsModal = document.getElementById("termsModal");
const closeButton = document.querySelector(".close-button");
const acceptTermsButton = document.getElementById("acceptTerms");
const agreementCheckbox = document.getElementById("agreement");
const imageMakerSection = document.getElementById("imageMaker");

// チェックボックスの状態を確認して画像生成セクションの表示を切り替える関数
function checkAgreement() {
  if (agreementCheckbox.checked) {
    imageMakerSection.style.display = "block";
    // 初期化処理
    initializeCanvas();
    drawBackgroundImage();
    updateCanvas(); // 初期値を描画
  } else {
    imageMakerSection.style.display = "none";
  }
}

// 初期表示時にチェック
checkAgreement();

// チェックボックスの状態変化を監視
agreementCheckbox.addEventListener("change", checkAgreement);

// 利用規約リンクをクリックしたらモーダルを表示
termsLink.addEventListener("click", function (e) {
  e.preventDefault();
  termsModal.style.display = "block";
});

// 閉じるボタンでモーダルを閉じる
closeButton.addEventListener("click", function () {
  termsModal.style.display = "none";
});

// 同意するボタンをクリックしたらチェックを入れてモーダルを閉じる
acceptTermsButton.addEventListener("click", function () {
  agreementCheckbox.checked = true;
  termsModal.style.display = "none";
  checkAgreement();
});

// モーダル外をクリックしても閉じる
window.addEventListener("click", function (event) {
  if (event.target == termsModal) {
    termsModal.style.display = "none";
  }
});

// ESCキーでモーダルを閉じられるようにする
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && termsModal.style.display === "block") {
    termsModal.style.display = "none";
  }
});
