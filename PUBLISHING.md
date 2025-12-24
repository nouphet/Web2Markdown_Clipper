# Chrome ウェブストアへの公開手順

作成した拡張機能をChromeウェブストアで公開する手順です。

## 前提条件

- **Googleアカウント**が必要です。
- **開発者登録**が必要です（初回のみ登録料 $5 がかかります）。
- 公開する拡張機能のフォルダ（`manifest.json` があるフォルダ）が準備できていること。

## 手順

### 1. パッケージの作成（zip化）

拡張機能のフォルダの中身をすべて選択し、ZIPファイルに圧縮します。

1. `C:\Users\nouph\Dropbox\dev\Web2Markdown_Clipper` フォルダを開きます。
2. 以下のファイル・フォルダをすべて選択します：
   - `manifest.json`
   - `background.js`
   - `content.js`
   - `popup/` フォルダー
   - `icons/` フォルダー
   - `libs/` フォルダー
   - `README.md` など（含めても問題ありません）
3. 右クリック -> 「送る」 -> 「圧縮 (zip 形式) フォルダー」を選択します。
4. `Web2Markdown_Clipper.zip` のような名前が作成されます。これが提出用ファイルです。

### 2. Chrome Web Store Developer Dashboard へのアクセス

1. [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard) にアクセスします。
2. 初めての場合は開発者登録と登録料（$5）の支払い画面が表示されるので、指示に従って完了させます。

### 3. アイテムのアップロード

1. ダッシュボードの「**新しいアイテム**」ボタンをクリックします。
2. 手順1で作成した ZIP ファイルをドラッグ＆ドロップまたは選択してアップロードします。

### 4. ストア掲載情報の入力

アップロードが完了すると、編集画面に移ります。以下の情報を入力します。
*入力項目は多岐にわたりますが、必須項目(*)は必ず埋めてください。*

- **ストアの掲載情報**:
  - **名前**: 自動入力されます（manifest.jsonから）。
  - **概要**: 自動入力されます。
  - **カテゴリ**: 「仕事効率化」や「開発者ツール」などを選択。
  - **言語**: 日本語を選択。
  - **説明**: 以下のテキストを参考にしてください（英語と日本語を用意しました）。

#### 英語 (English Description)

```text
Web2Markdown Clipper is a powerful browser extension that allows you to clip web pages and download them as clean, readable Markdown files.

It is designed to help you save articles, documentation, and blog posts for offline reading or for your personal knowledge base (e.g., Obsidian, Notion, VS Code).

Key Features:
- **Clean Clipping**: Removes ads, sidebars, and clutter using Readability.js.
- **Markdown Conversion**: Converts HTML to high-quality Markdown using Turndown.
- **Preview & Edit**: Preview the Markdown before downloading and make quick edits.
- **Selection Clipping**: Clip only the selected text on a page.
- **Privacy Focused**: No data collection. All processing happens locally in your browser.

This extension was built as a modern, Manifest V3 compliant alternative to the discontinued "MarkDownload" extension.
```

#### 日本語 (Japanese Description)

```text
Web2Markdown Clipperは、Webページをクリップして、きれいで読みやすいMarkdownファイルとしてダウンロードできる強力な拡張機能です。

記事、ドキュメント、ブログ記事などをオフラインで読んだり、個人のナレッジベース（Obsidian、Notion、VS Codeなど）に保存したりするのに最適です。

主な機能:
- **クリーンなクリッピング**: Readability.jsを使用して、広告やサイドバーなどの不要な要素を取り除きます。
- **Markdown変換**: Turndownを使用して、HTMLを高品質なMarkdownに変換します。
- **プレビュー & 編集**: ダウンロード前にMarkdownをプレビューし、必要に応じて編集できます。
- **選択範囲のクリップ**: ページ内の選択したテキストのみをクリップすることも可能です。
- **プライバシー重視**: データの収集は行いません。すべての処理はブラウザ内でローカルに行われます。

この拡張機能は、公開停止となった「MarkDownload」拡張機能の代替として、最新のManifest V3に準拠して開発されました。
```
- **画像**:
  - **アプリアイコン**: 128x128px のアイコン画像（`icons/icon128.png` が使えます）。
  - **スクリーンショット**: 実際に動作している画面のキャプチャ画像（最低1枚、1280x800 または 640x400）。
  - **プロモーションタイル**: ストアでの表示用画像（440x280px など。必須）。
- **プライバシー**:
  - **単一用途 (Single Purpose)**:
    - `Allows users to clip web page content and download it as a Markdown file for offline use.`
  - **権限が必要な理由 (Permissions Justification)**:
    - **activeTab**: `To access the title and URL of the currently active tab for the Markdown front matter.`
    - **scripting**: `To inject the Readability and Turndown scripts into the page to parse the HTML content.`
    - **downloads**: `To save the generated Markdown file to the user's local downloads folder.`
    - **contextMenus**: `To provide the "Clip Selection" option in the right-click menu.`
    - **clipboardWrite**: `To allow the user to copy the generated Markdown text to their clipboard.`
    - **ホスト権限 (<all_urls>)**: `To allow the extension to work on any web page the user visits to clip content.`
  - **リモートコード (Remote Code)**:
    - 「いいえ、リモートコードを使用していません」を選択。
  - **データ使用 (Data Usage)**:
    - すべてのチェックボックスを**空**にしてください（データ収集は行いません）。
  - **表明 (Certifications)**:
    - 「私は、承諾されている以外の用途で...」など、3つのチェックボックスすべてにチェックを入れます。
  - **プライバシーポリシー**:
    - データ収集を行わない場合でも入力を求められることがありますが、GitHubのリポジトリURL（`https://github.com/your-repo`）や、簡単な説明ページのURLを入力すれば通ることが多いです。データ収集を行わないため、厳密なポリシーは不要なケースが大半です。

### 5. 審査への提出

1. 全ての必須項目を入力し、「下書きを保存」します。
2. 「**審査のために送信**」ボタンをクリックします。
3. 審査には数日〜数週間かかる場合があります。

## 注意点

- **Manifest V3**: この拡張機能は Manifest V3 で作られているため、最新の要件を満たしています。
- **外部コード**: `libs/` フォルダにあるライブラリは、審査時に「これは何ですか？」と聞かれることはまずありませんが、もし聞かれたら「Mozilla Readability.js と Turndown.js の依存ライブラリです」と答えればOKです。
