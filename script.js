// MARK: 定数
const DEPARTMENT_CHAR_SIZE = 26; // 学部名 / 学科名のフォントサイズ
const NAME_CHAR_SIZE = 36; // 名前のフォントサイズ
const NAME_KANA_CHAR_SIZE = 18;

const DEPARTMENT_MARGIN = 30; // 学部名 / 学科名のマージン
const NAME_KANA_MARGIN = 20; // 名前カナのマージン
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

// 共通の描画関数を定義（プレビューとダウンロードで共用）
function renderCanvas(ctx, canvas, scale = 1) {
  // スケールに応じたサイズ計算
  const fontSize = {
    department: DEPARTMENT_CHAR_SIZE * scale,
    name: NAME_CHAR_SIZE * scale,
    nameKana: NAME_KANA_CHAR_SIZE * scale,
  };

  const margin = {
    default: DEFAULT_MARGIN * scale,
    department: DEPARTMENT_MARGIN * scale,
    nameKana: NAME_KANA_MARGIN * scale,
  };

  // 背景色を設定
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 入力値の取得
  const name = inputName.value || "";
  const nameKana = inputNameKana.value || "";
  const department = inputDepartment.value;
  const grade = inputGrade.value;
  const departmentString = `IT学部 ${
    DEPARTMENT_MAP[department] || department
  } ${grade}年`;

  // テキスト描画 - textBaselineを使わない統一方法
  ctx.textAlign = "right";
  ctx.fillStyle = "#333333";

  // 学科情報の描画
  ctx.font = `900 ${fontSize.department}px "GenShinGothic"`;
  const deptMetrics = ctx.measureText(departmentString);
  // テキストの高さ情報を取得（下に向かって負の値になる）
  const deptHeight =
    deptMetrics.actualBoundingBoxAscent + deptMetrics.actualBoundingBoxDescent;
  ctx.fillText(
    departmentString,
    canvas.width - margin.default,
    margin.department + deptHeight / 2
  );

  // 名前の描画
  ctx.font = `900 ${fontSize.name}px "GenShinGothic"`;
  const nameMetrics = ctx.measureText(name);
  const nameHeight =
    nameMetrics.actualBoundingBoxAscent + nameMetrics.actualBoundingBoxDescent;
  ctx.fillText(
    name,
    canvas.width - margin.default,
    canvas.height / 2 - margin.default + nameHeight / 2
  );

  // フリガナの描画
  ctx.font = `900 ${fontSize.nameKana}px "GenShinGothic"`;
  const kanaMetrics = ctx.measureText(nameKana);
  const kanaHeight =
    kanaMetrics.actualBoundingBoxAscent + kanaMetrics.actualBoundingBoxDescent;
  ctx.fillText(
    nameKana,
    canvas.width - margin.default,
    canvas.height / 2 + margin.nameKana + kanaHeight / 2
  );

  // ロゴの描画（後で呼び出し元で処理）
}

// キャンバスの更新関数を単純化
function updateCanvas() {
  renderCanvas(ctx, canvas, ratio);

  // 背景画像とロゴを描画
  const backgroundImage = new Image();
  backgroundImage.src = "img/ZoomBackground_base_2.png";
  backgroundImage.onload = () => {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // ロゴの描画
    const schoolLogo = new Image();
    schoolLogo.src = "img/HAL_logo.png";
    schoolLogo.onload = () => {
      const LOGO_HEIGHT = schoolLogo.height * ratio * SCHOOL_LOGO_SCALE;
      const LOGO_WIDTH = LOGO_HEIGHT * (schoolLogo.width / schoolLogo.height);
      const LOGO_MARGIN = DEFAULT_MARGIN * ratio;

      ctx.drawImage(
        schoolLogo,
        canvas.width - LOGO_WIDTH - LOGO_MARGIN,
        canvas.height - LOGO_HEIGHT - LOGO_MARGIN,
        LOGO_WIDTH,
        LOGO_HEIGHT
      );
    };
  };
}

inputName.addEventListener("input", updateCanvas);
inputNameKana.addEventListener("input", updateCanvas);
inputDepartment.addEventListener("input", updateCanvas);
inputGrade.addEventListener("input", updateCanvas);

// 再描画処理
window.addEventListener("resize", handleResize);
function handleResize() {
  initializeCanvas();
  updateCanvas(); // 再描画
}

// ダウンロードボタンの処理を修正
downloadButton.addEventListener("click", () => {
  const buffer = document.createElement("canvas");
  const bufferCtx = buffer.getContext("2d");
  buffer.width = 1920;
  buffer.height = 1080;
  bufferCtx.fillStyle = "#ffffff";
  bufferCtx.fillRect(0, 0, buffer.width, buffer.height);

  // 背景画像を先に描画
  const backgroundImage = new Image();
  backgroundImage.src = "img/ZoomBackground_base_2.png";
  backgroundImage.onload = () => {
    bufferCtx.drawImage(backgroundImage, 0, 0, buffer.width, buffer.height);

    // ここが重要: devicePixelRatioの影響を取り除いたアップスケールファクターを計算
    // canvas.widthはすでにratioが掛けられているので、元のサイズに戻してから計算する
    const displayWidth = canvas.width / ratio;
    const UPSCALE_FACTOR = 1920 / displayWidth;

    // 入力値の取得
    const name = inputName.value || "";
    const nameKana = inputNameKana.value || "";
    const department = inputDepartment.value;
    const grade = inputGrade.value;
    const departmentString = `IT学部 ${
      DEPARTMENT_MAP[department] || department
    } ${grade}年`;

    // フォントサイズを明示的に設定
    const fontSize = {
      department: DEPARTMENT_CHAR_SIZE * UPSCALE_FACTOR,
      name: NAME_CHAR_SIZE * UPSCALE_FACTOR,
      nameKana: NAME_KANA_CHAR_SIZE * UPSCALE_FACTOR,
    };

    const margin = {
      default: DEFAULT_MARGIN * UPSCALE_FACTOR,
      department: DEPARTMENT_MARGIN * UPSCALE_FACTOR,
      nameKana: NAME_KANA_MARGIN * UPSCALE_FACTOR,
    };

    // テキスト描画設定
    bufferCtx.textAlign = "right";
    bufferCtx.fillStyle = "#333333";

    // 学科情報の描画
    bufferCtx.font = `900 ${fontSize.department}px "GenShinGothic"`;
    const deptMetrics = bufferCtx.measureText(departmentString);
    const deptHeight =
      deptMetrics.actualBoundingBoxAscent +
      deptMetrics.actualBoundingBoxDescent;
    bufferCtx.fillText(
      departmentString,
      buffer.width - margin.default,
      margin.department + deptHeight / 2
    );

    // 名前の描画
    bufferCtx.font = `900 ${fontSize.name}px "GenShinGothic"`;
    const nameMetrics = bufferCtx.measureText(name);
    const nameHeight =
      nameMetrics.actualBoundingBoxAscent +
      nameMetrics.actualBoundingBoxDescent;
    bufferCtx.fillText(
      name,
      buffer.width - margin.default,
      buffer.height / 2 - margin.default + nameHeight / 2
    );

    // フリガナの描画
    bufferCtx.font = `900 ${fontSize.nameKana}px "GenShinGothic"`;
    const kanaMetrics = bufferCtx.measureText(nameKana);
    const kanaHeight =
      kanaMetrics.actualBoundingBoxAscent +
      kanaMetrics.actualBoundingBoxDescent;
    bufferCtx.fillText(
      nameKana,
      buffer.width - margin.default,
      buffer.height / 2 + margin.nameKana + kanaHeight / 2
    );

    // 最後にロゴを描画
    const logo = new Image();
    logo.src = "img/HAL_logo.png";
    logo.onload = () => {
      const LOGO_SCALE = SCHOOL_LOGO_SCALE * UPSCALE_FACTOR;
      const LOGO_HEIGHT = logo.height * LOGO_SCALE;
      const LOGO_WIDTH = LOGO_HEIGHT * (logo.width / logo.height);
      const LOGO_MARGIN = DEFAULT_MARGIN * UPSCALE_FACTOR;

      bufferCtx.drawImage(
        logo,
        buffer.width - LOGO_WIDTH - LOGO_MARGIN,
        buffer.height - LOGO_HEIGHT - LOGO_MARGIN,
        LOGO_WIDTH,
        LOGO_HEIGHT
      );

      // ダウンロード処理
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
