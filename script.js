// MARK: 定数
const ratio = devicePixelRatio || 1;

const DEPARTMENT_CHAR_SIZE = 26; // 学部名 / 学科名のフォントサイズ
const NAME_CHAR_SIZE = 36; // 名前のフォントサイズ
const NAME_KANA_CHAR_SIZE = 18;

const DEPARTMENT_MARGIN = 30 + 2 * ratio; // 学部名 / 学科名のマージン
const NAME_KANA_MARGIN = 20; // 名前カナのマージン
const DEFAULT_MARGIN = 20; // 名前のマージン

const DEPARTMENT_LENGTH_THRESHOLD = 24; // 学部名 / 学科名の長さの閾値

const SCHOOL_LOGO_SCALE = 0.35; // ロゴのスケール

// 学部名 / 学科名 対応表
const DEPARTMENT_MAP = {
  IT学部: {
    1: "高度情報学科 高度ITコース",
    2: "高度情報学科 WEB開発コース",
    3: "高度情報学科 AIシステム開発コース",
    4: "高度情報学科 高度システムエンジニア専攻",
    5: "高度情報学科 IoTネットワーク専攻",
    6: "高度情報学科 サイバーセキュリティ専攻",
  },
  ゲーム学部: {
    1: "ゲーム4年制学科 ゲーム制作コース",
    2: "ゲーム4年制学科 ゲーム企画コース",
    3: "ゲーム4年制学科 ゲームデザインコース",
    4: "ゲーム4年制学科 VR・3Dゲームプログラマー専攻",
    5: "ゲーム4年制学科 オンラインゲームプログラマー専攻",
    6: "ゲーム4年制学科 スマートフォンゲームプログラマー専攻",
    7: "ゲーム4年制学科 ゲームプランナー専攻",
    8: "ゲーム4年制学科 ゲームシナリオライター専攻",
    9: "ゲーム4年制学科 ゲームディレクター専攻",
    10: "ゲーム4年制学科 ゲームデザイナー専攻",
    11: "ゲーム4年制学科 ゲーム3Dキャラクターデザイナー専攻",
    12: "ゲーム4年制学科 ゲームスマートフォンゲームデザイナー専攻",
  },
  CG学部: {
    1: "CG・デザイン・アニメ四年制学科 CG映像コース",
    2: "CG・デザイン・アニメ四年制学科 グラフィックデザインコース",
    3: "CG・デザイン・アニメ四年制学科 イラストコース",
    4: "CG・デザイン・アニメ四年制学科 アニメーションコース",
    5: "CG・デザイン・アニメ四年制学科 3DCGクリエイター専攻",
    6: "CG・デザイン・アニメ四年制学科 VFXアーティスト専攻",
    7: "CG・デザイン・アニメ四年制学科 CGデザイナー専攻",
    8: "CG・デザイン・アニメ四年制学科 イラストレーター専攻",
    9: "CG・デザイン・アニメ四年制学科 アニメーター専攻",
    10: "CG・デザイン・アニメ四年制学科 デジタル作画専攻",
  },
  カーデザイン学部: {
    1: "カーデザイン学科 カーデザインコース",
    2: "カーデザイン学科 カーモデラーコース",
    3: "カーデザイン学科 カーデザイナー専攻",
    4: "カーデザイン学科 次世代モビリティ開発専攻",
    5: "カーデザイン学科 カーモデラー専攻",
  },
  ミュージック学部: {
    1: "ミュージック学科 サウンドエンジニアコース",
    2: "ミュージック学科 サウンドクリエイターコース",
    3: "ミュージック学科 サウンドエンジニア専攻",
    4: "ミュージック学科 サウンドクリエイター専攻",
    5: "ミュージック学科 ゲームミュージック専攻",
  },
  ゲーム学部2年生課程: {
    1: "ゲーム学科 2年制課程",
    2: "ゲーム学科 ゲームプログラム専攻",
    3: "ゲーム学科 キャラクターデザイン専攻",
  },
  CG学部2年制課程: {
    1: "CG学科 2年制課程",
    2: "CG学科 CGアニメーション専攻",
    3: "CG学科 CGデザイン専攻",
  },
  WEB学部: {
    1: "WEB学科 2年制課程",
    2: "WEB学科 WEBプログラム専攻",
    3: "WEB学科 WEBデザイン専攻",
  },
  情報処理学部: {
    1: "情報処理学科 2年制課程",
    2: "情報処理学科 情報処理プログラム専攻",
    3: "情報処理学科 ネットワークセキュリティ専攻",
  },
  ミュージック学部2年制課程: {
    1: "ミュージック学科 2年制課程",
    2: "ミュージック学科 コンピュータミュージック専攻",
    3: "ミュージック学科 PA・レコーディング専攻",
  },
};

// input要素の取得
const inputName = document.getElementById("name");
const inputNameKana = document.getElementById("nameKana");
const inputDepartment = document.getElementById("department");
const inputGrade = document.getElementById("grade");
const downloadButton = document.getElementById("downloadButton");

// input要素の追加取得
const inputModeRadios = document.querySelectorAll('input[name="input-mode"]');
const selectModeControls = document.getElementById("select-mode-controls");
const customModeControls = document.getElementById("custom-mode-controls");
const inputCustomDepartment = document.getElementById("customDepartment");
const inputCustomGrade = document.getElementById("customGrade");

// キャンバスの取得と設定
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
    department: DEPARTMENT_CHAR_SIZE * scale + 4 * ratio,
    name: NAME_CHAR_SIZE * scale,
    nameKana: NAME_KANA_CHAR_SIZE * scale,
  };

  const margin = {
    default: DEFAULT_MARGIN * scale,
    department: DEPARTMENT_MARGIN * scale,
    nameKana: NAME_KANA_MARGIN * scale,
  };

  // 入力値の取得
  const name = inputName.value || "";
  const nameKana = inputNameKana.value || "";

  // 入力モードに応じて値を取得
  const inputMode = document.querySelector(
    'input[name="input-mode"]:checked'
  ).value;
  let departmentString = "";

  if (inputMode === "select") {
    // 選択モードの場合は既存ロジックを使用
    const departmentValue = inputDepartment.value;
    const grade = inputGrade.value;

    let faculty, courseId, courseName;
    [faculty, courseId] = departmentValue.split(":");
    courseName = DEPARTMENT_MAP[faculty][courseId];
    departmentString = `${courseName} ${grade}年`;
  } else {
    // カスタム入力モードの場合
    const customDept = inputCustomDepartment.value || "";
    const customGrade = inputCustomGrade.value || "";
    departmentString = customDept;
    if (customGrade) {
      departmentString += ` ${customGrade}`;
    }
  }

  // テキスト描画 - textBaselineを使わない統一方法
  ctx.textAlign = "right";
  ctx.fillStyle = "#333333";

  // 学科情報の描画
  ctx.font = `900 ${
    departmentString.length > DEPARTMENT_LENGTH_THRESHOLD
      ? (fontSize.department / 4) * 3
      : fontSize.department
  }px "GenShinGothic"`;
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
  // 背景色を設定
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 背景画像とロゴを描画
  const backgroundImage = new Image();
  backgroundImage.src = "img/ZoomBackground_base_2.png";
  backgroundImage.onload = () => {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    renderCanvas(ctx, canvas, ratio);

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
inputDepartment.addEventListener("change", updateCanvas);
inputGrade.addEventListener("change", updateCanvas);

// カスタム入力フィールドにイベントリスナーを追加
inputCustomDepartment.addEventListener("input", updateCanvas);
inputCustomGrade.addEventListener("input", updateCanvas);

// モード切替ハンドラー設定
inputModeRadios.forEach((radio) => {
  radio.addEventListener("change", handleInputModeChange);
});

// 入力モードの変更を処理
function handleInputModeChange() {
  const selectedMode = document.querySelector(
    'input[name="input-mode"]:checked'
  ).value;

  if (selectedMode === "select") {
    selectModeControls.style.display = "block";
    customModeControls.style.display = "none";
  } else {
    selectModeControls.style.display = "none";
    customModeControls.style.display = "block";
  }

  updateCanvas(); // 表示を更新
}

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

    // 入力モードに応じて値を取得
    const inputMode = document.querySelector(
      'input[name="input-mode"]:checked'
    ).value;
    let departmentString = "";

    if (inputMode === "select") {
      const departmentValue = inputDepartment.value;
      const grade = inputGrade.value;

      let faculty, courseId, courseName;
      [faculty, courseId] = departmentValue.split(":");
      courseName = DEPARTMENT_MAP[faculty][courseId];
      departmentString = `${courseName} ${grade}年`;
    } else {
      const customDept = inputCustomDepartment.value || "";
      const customGrade = inputCustomGrade.value || "";
      departmentString = customDept;
      if (customGrade) {
        departmentString += ` ${customGrade}`;
      }
    }

    // フォントサイズを明示的に設定
    const fontSize = {
      department: DEPARTMENT_CHAR_SIZE * UPSCALE_FACTOR + 4 * ratio,
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
    bufferCtx.font = `900 ${
      departmentString.length > DEPARTMENT_LENGTH_THRESHOLD
        ? (fontSize.department / 4) * 3
        : fontSize.department
    }px "GenShinGothic"`;
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

// DEPARTMENT_MAPからselect要素を動的に生成する関数
function populateDepartmentSelect() {
  const departmentSelect = document.getElementById("department");

  // 既存のオプションをクリア
  departmentSelect.innerHTML = "";

  // 各学部（optgroup）をループ処理
  for (const faculty in DEPARTMENT_MAP) {
    // 学部のoptgroupを作成
    const optgroup = document.createElement("optgroup");
    optgroup.label = faculty;

    // 各コース（option）をループ処理
    const courses = DEPARTMENT_MAP[faculty];
    for (const courseId in courses) {
      // コースのoptionを作成
      const option = document.createElement("option");
      // 「学部:コースID」形式の値を設定
      option.value = `${faculty}:${courseId}`;
      option.textContent = courses[courseId];

      // optgroupにoptionを追加
      optgroup.appendChild(option);
    }

    // selectにoptgroupを追加
    departmentSelect.appendChild(optgroup);
  }
}

// 初期表示時にチェック
document.addEventListener("DOMContentLoaded", function () {
  // 学部・学科選択肢の自動生成
  populateDepartmentSelect();

  // 他の初期化処理
  checkAgreement();
  initializeCanvas();
  updateCanvas();
});

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
