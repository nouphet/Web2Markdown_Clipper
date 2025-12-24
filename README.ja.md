# Web2Markdown Clipper

Webサイトをクリップし、読みやすいMarkdownファイルとしてダウンロードするChrome拡張機能です。このプロジェクトは「MarkDownload」拡張機能の機能を再現しつつ、最新のChrome拡張機能のマニフェストV3のベストプラクティスに準拠することを目的としています。

## 機能

## 背景と謝辞

このプロジェクトは、素晴らしい拡張機能である [MarkDownload - Markdown Web Clipper](https://chromewebstore.google.com/detail/markdownload-markdown-web/pcmpcfapbekmbjjkdalcgopdkipoggdi) に触発されて作成されました。残念ながら、オリジナルの拡張機能は現在、「この拡張機能は、Chrome 拡張機能のベスト プラクティスに沿わないため、ご利用いただけなくなりました。」と表示され、利用できない状態にあります。

私たちは、この有用な機能をコミュニティに取り戻すために、**Web2Markdown Clipper** を開発しました。最新の **Manifest V3** 規格およびChromeのベストプラクティスに完全に準拠する形で、ゼロから再構築しています。

MarkDownloadのオリジナルの開発者の方々の先駆的な取り組みとコンセプトに深く感謝いたします。

### 基本機能
- **Webクリッピング**: [Readability.js](https://github.com/mozilla/readability) を使用して、広告やサイドバーなどの余計な要素を取り除き、Webページのメインコンテンツを抽出します。
- **Markdown変換**: 抽出したHTMLコンテンツを [Turndown](https://github.com/mixmark-io/turndown) を使用してMarkdown形式に変換します。
- **プレビュー & 編集**: ポップアップウィンドウでレンダリングされたMarkdownを表示し、ダウンロード前に簡単な編集やクリップボードへのコピーが可能です。
- **ダウンロード**: コンテンツを `.md` ファイルとして保存します。

### 高度な機能
- **選択範囲のクリッピング**: ページ上で選択したテキストのみをダウンロードまたはコピーします。
- **コンテキストメニュー**: ページ、画像、リンク、または選択範囲を右クリックして、Markdownスニペットをコピー/ダウンロードできます。
- **バッチ処理**: 「すべてのタブをダウンロード」機能により、開いている複数のページを一度にクリップできます。
- **Obsidian連携**: 「Advanced Obsidian URI」プラグインを介したObsidianとの連携をサポートし、URLの文字数制限を回避します。
- **カスタマイズ可能なテンプレート**: フロントマターやコンテンツのテンプレート（タイトル、日付、URLソースなど）を設定可能です。

### 技術スタック
- **Manifest V3**: 最新のChrome拡張機能のセキュリティおよびパフォーマンス基準に準拠しています。
- **Readability.js**: 記事の抽出に使用します。
- **Turndown**: HTMLからMarkdownへの変換に使用します。
- **Service Workers**: バックグラウンドタスク（コンテキストメニュー、バッチダウンロード）のロジック処理に使用します。

## テスト推奨サイト

拡張機能の動作確認を行うには、以下の構造化されたコンテンツを持つサイトでのテストをお勧めします。

- **Wikipedia**: 複雑なフォーマット、表、参照のテストに最適です。
- **MDN Web Docs**: コードブロックや技術ドキュメントのテストに適しています。
- **Dev.to / Zenn / Qiita**: ブログ記事の抽出や画像の扱いの確認に良いでしょう。
- **GitHub README**: 既存のMarkdownライクな構造をどのように処理するか確認できます。

## Chrome ウェブストアへのパッケージ化

Chrome ウェブストアへの提出用に有効なZIPファイルを作成するには、Makefile（`make`がインストールされている場合）を使用するか、PowerShellコマンドを直接実行します。

### Make を使用する場合
```bash
make clean zip
```

### ターミナルを使用する場合 (Linux/Mac)
基本的には上記の `make` が使用できますが、`zip` コマンドで直接作成することも可能です：
```bash
zip -r Web2Markdown_Clipper.zip manifest.json background.js content.js popup icons libs README.md README.ja.md PUBLISHING.md COMPLIANCE_CHECK.md LICENSE
```

### PowerShell を使用する場合
```powershell
Compress-Archive -Path manifest.json, background.js, content.js, popup, icons, libs, README.md, README.ja.md, PUBLISHING.md, COMPLIANCE_CHECK.md -DestinationPath Web2Markdown_Clipper.zip -Force
```
