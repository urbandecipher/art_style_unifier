# Art Style Unifier Pro

[繁體中文](README_zh-TW.md) | [简体中文](README_zh-CN.md) | [English](README_en.md) | [日本語](README_ja.md) | [한국어](README_ko.md)

ダークテーマの商用向けローカル画像スタイル統一ツールです。多言語のWebインターフェースを備えています。

## Web の多言語オプション

指定した言語で直接開けます：

- [繁體中文](index.html?lang=zh-Hant)
- [简体中文](index.html?lang=zh-Hans)
- [English](index.html?lang=en)
- [日本語](index.html?lang=ja)
- [한국어](index.html?lang=ko)

ページ右上の言語セレクターからも切り替えできます。

## 機能

- 1枚の基準画像で複数の対象画像の視覚スタイルを統一
- Oklab 統計色調転送とヒストグラムマッチング
- 粒子マッチングとフィルムハレーション効果
- Surface Blur + Sobel によるトゥーン線の後処理
- Before / After のドラッグ比較プレビュー
- PNG の単体または一括ダウンロード
- 繁体字中国語、簡体字中国語、英語、日本語、韓国語に対応

## 使い方

`index.html` を直接開くか、GitHub Pages を有効にしてブラウザで使用します。

詳しい説明は `user_guide.html` を参照してください。

## スクリーンショット

![ホーム](assets/screenshots/01-home.png)

![アップロード](assets/screenshots/02-uploaded.png)

![処理結果](assets/screenshots/03-processed.png)

## プライバシー

画像処理はブラウザ上のローカル Canvas で実行されます。サーバーへアップロードする仕組みは内蔵していません。
