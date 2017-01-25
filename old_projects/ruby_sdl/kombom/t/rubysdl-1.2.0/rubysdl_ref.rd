= 目次
* ((<"Ruby/SDLの概要">))
* ((<初期化>))
* ((<Video>))
* ((<Window Management>))
* ((<Event>))
* ((<Joystick>))
* ((<CD-ROM>))
* ((<Audio>))
* ((<Time>))
* ((<Font>))
* ((<衝突判定>))
* ((<SDLSKK>))
* ((<MPEG playback>))

= Ruby/SDLの概要
Ruby/SDL は ((<SDL|URL:http://www.libsdl.org/>)) を
((<Ruby|URL:http://www.ruby-lang.org/>)) から利用するための
拡張ライブラリです。
Ruby でゲームなどを使うためなどに利用できます。

Ruby/SDLは、以下の機能を持っています。
* ((<2D高速描画|Video>))
* ((<キーボードやマウス|Event>))、((<ジョイスティック|Joystick>))から
  の入力の取り扱い
* ((<SDL_mixer|URL:http://www.libsdl.org/projects/SDL_mixer/index.html>))
  による((<音声再生|Audio>))
* ((<CD-ROMの再生|CD-ROM>))
* ((<SDL_ttf|URL:http://www.libsdl.org/projects/SDL_ttf/index.html>))、
  ((<SDL_kanji|URL:http://shinh.skr.jp/sdlkanji/>))、
  ((<SGE|URL:http://www.etek.chalmers.se/~e8cal1/sge/index.html>))
  による((<文字列の描画|Font>))
* ((<OpenGL Interface|URL:http://www2.giganet.net/~yoshi/>))による
  3D描画
* ((<時間の計測および一時停止|Time>))
* ((<SDLSKK|URL:http://www.kmc.gr.jp/~ohai/sdlskk.html>))による、
  ((<行単位の日本語入力|SDLSKK>))
* ((<SMPGE|URL:http://www.icculus.org/smpeg/>))による
  ((<mpegの再生|MPEG playback>))
* その他にも、((<Windowの管理|Window Management>))や
  ((<衝突判定>))など


== SDL::Error
SDL固有のエラーを表わす例外クラスです。StandardErrorを継承しています。

== SDL::VERSION
SDLのバージョンを表わす文字列です。"1.0.0"という形になっています。


= 初期化
  * ((<SDL.init>)) -- SDLを初期化します。
  * ((<SDL.quit>)) -- SDLをシャットダウンします。
  * ((<SDL.inited_system>)) -- サブシステムが初期化されているかどうかをチェックします。
  * ((<SDL.getenv>)) -- 環境変数を得ます。
  * ((<SDL.putenv>)) -- 環境変数を変更します。

Ruby/SDLを使う前には必ず((<SDL.init>))で初期化する必要があります。((<SDL.init>))は、
ユーザの指定したすべてのサブシステム(ビデオ、オーディオ、ジョイスティック、
タイマー、CD-ROMのいずれかあるいは全部)を初期化することができます。

== Methods

--- SDL.init(flags)

    SDLを初期化します。
    すべてのRuby/SDLのメソッドを呼び出す前にこの関数が呼ばれなければいけません。
    ((|flags|))にはSDLのどの部分を初期化するかを指定します。
    :SDL::INIT_AUDIO
      オーディオサブシステム(音声出力機能)を初期化
    :SDL::INIT_VIDEO
       ビデオサブシステム(画像出力機能とキーボード、マウス入力機能)を初期化
    :SDL::INIT_CDROM
      CDROMサブシステム(CD再生機能)を初期化
    :SDL::INIT_JOYSTICK
      ジョイスティックサブシステム(ジョイスティック入力機能)を初期化
    :SDL::INIT_EVERYTHING
      上に挙げた機能を全て初期化します。

    失敗すると例外((<SDL::Error>))が発生します。

--- SDL.quit

    全てのSDLサブシステムをシャットダウンし、それらが確保したリソースをすべて解
    放します。通常は自動で呼ばれるためユーザが明示的に呼びだす必要はありません。
    
    SDLおよびRuby/SDLの仕様を理解した上で必要な場合のみ使ってください。

--- SDL.inited_system(flags)
--- SDL.initedSystem(flags)

    これは、どのSDLサブシステムが((<初期化されているか|SDL.init>))を報告します。
    ((|flags|))には、調べたいサブシステムの論理和を指定します
    (指定できるサブシステムのフラグについては((<SDL.init>))の項を参照してください)。

    初期化されているサブシステムの論理和を返します。


    EXAMPLE
      # SDL.inited_systemの使いかた
      
      # 全てのサブシステムの初期化状態を得ます
      subsystem_init = SDL.inited_system(SDL::INIT_EVERYTHING)
      
      if subsystem_init & SDL::INIT_VIDEO
        puts "ビデオは初期化されています。"
      else
        puts "ビデオは初期化されていません。"
      end
      
      
      
      # 1つのサブシステムだけをチェックします
      
      if SDL.inited_system(SDL::INIT_VIDEO) != 0
        puts "ビデオは初期化されています。"
      else
        puts "ビデオは初期化されていません。"
      end
      
      
      
      # 2つのサブシステムをチェックします
      
      subsystem_mask = SDL::INIT_VIDEO|SDL::INIT_AUDIO;
      
      if SDL.inited_system(subsystem_mask) == subsystem_mask
        puts "ビデオとオーディオはどちらも初期化されています。"
      else
        puts "ビデオとオーディオのどちらか、または両方が初期化されていません。"
      end

    * See Also
      
      ((<SDL.init>))

--- SDL.getenv(var)

    ((|var|))で指定した環境変数を得ます。

    環境変数の値を文字列で返します。

--- SDL.putenv(string)

    環境変数の追加または値の変更を行います。((|string|)) は "name=value"
    という形式を取ります。
    
    Windows上でSDL_WINDOWIDやSDL_VIDEODRIVERといった環境変数を使って
    SDLの実行に影響を与えたいときに利用します。
    SDLの仕様によりWindowsでは ENV を直接変更してもこれらの機能が使え
    ないためこのような関数が存在しま。Unix上では ENV を使うのと同じ
    効果があります。

    失敗時には例外((<SDL::Error>))を発生させます。


    EXAMPLE
      # http://moriq.tdiary.net/20051006.html より
      # Ruby/SDL と Apolloの併用
      require 'phi'
      require 'sdl'
      
      # フォームの生成
      form = Phi::Form.new
      $terminated = false
      form.on_close{ $terminated = true }
      form.caption = "Ruby/SDL on Phi::Form"
      # パネルをフォームの上に作る
      panel = Phi::Panel.new(form)
      panel.align = Phi::AL_LEFT
      
      # WINDOWID hackを使い、パネルにSDLのウインドウをのせる
      SDL.putenv("SDL_VIDEODRIVER=windib")
      SDL.putenv("SDL_WINDOWID=#{panel.handle}")
      form.show
      
      # SDL本体の初期化など
      SDL.init(SDL::INIT_VIDEO)
      screen = SDL.setVideoMode(640, 480, 16, SDL::SWSURFACE)
      
      # メインループ、とりあえず何もしない
      unless $terminated
        while event = SDL::Event2.poll
          case event
          when SDL::Event2::KeyDown, SDL::Event2::Quit
            exit
          end
        end
      
        sleep 0.05
      end

= Video
* ((<Video Subsystem 概説>))
* ((<SDL::Screen>))
* ((<SDL::Surface>))
* ((<SDL::VideoInfo>))
* ((<色、ピクセルフォーマット、ピクセル値について>))

* Video関連メソッド
  * ((<SDL.get_video_surface>)) -- 現在の表示サーフェスを返します。
  * ((<SDL.video_info>)) -- ビデオハードウェアについての情報を返します。
  * ((<SDL.video_driver_name>)) -- ビデオドライバの名前を取得します。
  * ((<SDL.list_modes>)) -- 与えられたフォーマットとビデオのフラグに対し、利用可能な画面モードの配列を返します。
  * ((<SDL.check_video_mode>)) -- ある特定のビデオモードがサポートされているかチェックします。
  * ((<SDL.set_video_mode>)) -- 指定された横幅・高さ・ピクセル深度を用いてビデオモードを設定します。
  * ((<SDL::Screen#update_rect>)) -- 与えられた領域の画面を更新します。
  * ((<SDL::Screen#flip>)) -- スクリーンバッファを交換します。
  * ((<SDL::Surface#set_colors>)) -- 与えられた 8 bit サーフェスのカラーマップの一部をセットします。
  * ((<SDL::Surface#set_palette>)) -- 8 ビットサーフェスのパレットに色をセットします。
  * ((<SDL.set_gamma>)) -- 表示用のカラーガンマ関数をセットします。
  * ((<SDL.get_gamma_ramp>)) -- 表示のためのカラーガンマ値の変換テーブルを取得します。
  * ((<SDL.set_gamma_ramp>)) -- 表示用にカラーガンマの参照テーブルをセットします。
  * ((<SDL::Surface#map_rgb>)) -- RGB カラー値をピクセルフォーマットに写像します。
  * ((<SDL::Surface#map_rgba>)) -- RGBA カラー値をピクセルフォーマットに写像します。
  * ((<SDL::Surface#get_rgb>)) -- 指定されたピクセルフォーマット内のピクセルから RGB 値を取得します。
  * ((<SDL::Surface#get_rgba>)) -- 指定されたピクセルフォーマット内のピクセルから RGBA 値を取得します。
  * ((<SDL::Surface.new>)) -- 空の ((<SDL::Surface>)) のインスタンスを生成します。
  * ((<SDL::Surface.new_from>)) -- ピクセルデータから ((<SDL::Surface>)) のインスタンスを生成します。
  * ((<SDL::Surface#lock>)) -- 直接アクセスのためにサーフェスをロックします。
  * ((<SDL::Surface#unlock>)) -- 以前にロックされたサーフェスのロックを解除します。
  * ((<SDL::Surface#must_lock?>)) -- ロックが必要かどうかを返します。
  * ((<SDL::Surface.load_bmp>)) -- Windows の BMP ファイルをサーフェスにロードします。
  * ((<SDL::Surface.load_bmp_from_io>)) -- RubyのIOオブジェクトから BMP ファイルをサーフェスにロードします。
  * ((<SDL::Surface#save_bmp>)) -- サーフェスを Windows の BMP ファイルとしてセーブします。
  * ((<SDL::Surface#set_color_key>)) -- blit 転送可能なサーフェスのカラーキー(透明ピクセル)と、RLE アクセラレーションをセットします。
  * ((<SDL::Surface#set_alpha>)) -- サーフェスのアルファ値を調整します。
  * ((<SDL::Surface#set_clip_rect>)) -- サーフェスのクリッピング矩形をセットします。
  * ((<SDL::Surface#get_clip_rect>)) -- サーフェスのクリッピング矩形を取得します。
  * ((<SDL.blit_surface>)) -- 転送元サーフェスから転送先サーフェスへ高速 blit 転送を行います。
  * ((<SDL::Surface#fill_rect>)) -- 与えられた矩形領域と色で高速な塗り潰しを行います。
  * ((<SDL::Surface#display_format>)) -- サーフェスを表示フォーマットに変換します。
  * ((<SDL::Surface#display_format_alpha>)) -- サーフェスを表示フォーマットに変換します。
  * ((<SDL::Surface#flags>)) -- サーフェスのフラグ
  * ((<SDL::Surface#w>)) -- サーフェスの幅
  * ((<SDL::Surface#h>)) -- サーフェスの高さ
  * ((<SDL::Surface#pixels>)) -- 実際のピクセルデータを返します
  * ((<SDL::Surface#Rmask>)) -- 赤チャンネルの値を取得するのに使われるビットマスク
  * ((<SDL::Surface#Gmask>)) -- 緑チャンネルの値を取得するのに使われるビットマスク
  * ((<SDL::Surface#Bmask>)) -- 青チャンネルの値を取得するのに使われるビットマスク
  * ((<SDL::Surface#Amask>)) -- αチャンネルの値を取得するのに使われるビットマスク
  * ((<SDL::Surface#colorkey>)) -- 透明ピクセルのピクセル値
  * ((<SDL::Surface#alpha>)) -- サーフェス全体のα値
  * ((<SDL::Surface#bpp>)) -- サーフェスの各ピクセルを表わすのに使われるビット数
  * ((<SDL::Surface.load>)) -- 画像をサーフェスにロードします。
  * ((<SDL::Surface.load_from_io>)) -- RubyのIOオブジェクトから画像をサーフェスにロードします。
  * ((<SDL::Surface#put_pixel>)) -- 指定した位置に点を書きます。
  * ((<SDL::Surface#get_pixel>)) -- 指定した位置のピクセル値を得ます。
  * ((<SDL::Surface#put>)) -- 指定したサーフェス全体を指定した位置に高速 blit 転送します。
  * ((<SDL::Surface#copy_rect>)) -- サーフェスの一部を切り出した新しいサーフェスを返します。
  * ((<SDL.auto_lock?>)) -- サーフェスを自動でロックするかどうかを返す。
  * ((<SDL.auto_lock_on>)) -- 自動ロックを利用するようにします。
  * ((<SDL.auto_lock_off>)) -- 自動ロックを利用しないようにします。
  * ((<SDL.auto_lock=>)) -- 自動ロックを使うかどうかを設定します。
  * ((<SDL.transform>)) -- 回転縮小拡大描画をします。
  * ((<SDL.transform_blit>)) -- カラーキーおよびアルファブレンドが有効な回転縮小拡大描画をします。
  * ((<SDL::Surface#draw_line>)) -- 直線を描画します。
  * ((<SDL::Surface#draw_aa_line>)) -- アンチエイリアシングされた直線を描画します。
  * ((<SDL::Surface#draw_line_alpha>)) -- アルファブレンディングした直線を描画します。
  * ((<SDL::Surface#draw_aa_line_alpha>)) -- アルファブレンディングした直線を描画します。
  * ((<SDL::Surface#draw_rect>)) -- 長方形を描画します。
  * ((<SDL::Surface#draw_rect_alpha>)) -- 長方形をアルファブレンディング描画します。
  * ((<SDL::Surface#draw_filled_rect_alpha>)) -- 塗り潰した長方形をアルファブレンディング描画します。
  * ((<SDL::Surface#draw_circle>)) -- 円を描画します。
  * ((<SDL::Surface#draw_filled_circle>)) -- 塗り潰した円を描画します。
  * ((<SDL::Surface#draw_aa_circle>)) -- アンチエイリアスをかけた円を描画します。
  * ((<SDL::Surface#draw_aa_filled_circle>)) -- 塗り潰した円をアンチエイリアスをかけて描画します。
  * ((<SDL::Surface#draw_circle_alpha>)) -- 円をアルファブレンディング描画します。
  * ((<SDL::Surface#draw_filled_circle_alpha>)) -- 塗り潰した円をアルファブレンディング描画します。
  * ((<SDL::Surface#draw_aa_circle_alpha>)) -- 円をアルファブレンディング、アンチエイリアス描画します。
  * ((<SDL::Surface#draw_ellipse>)) -- 楕円を描画します。
  * ((<SDL::Surface#draw_filled_ellipse>)) -- 塗り潰した楕円を描画します。
  * ((<SDL::Surface#draw_aa_ellipse>)) -- アンチエイリアスをかけた楕円を描画します。
  * ((<SDL::Surface#draw_aa_filled_ellipse>)) -- 塗り潰した楕円をアンチエイリアスをかけて描画します。
  * ((<SDL::Surface#draw_ellipse_alpha>)) -- 楕円をアルファブレンディング描画します。
  * ((<SDL::Surface#draw_filled_ellipse_alpha>)) -- 塗り潰した楕円をアルファブレンディング描画します。
  * ((<SDL::Surface#draw_aa_ellipse_alpha>)) -- 楕円をアルファブレンディング、アンチエイリアス描画します。
  * ((<SDL::Surface#draw_bezier>)) -- ベジエ曲線を描く
  * ((<SDL::Surface#draw_aa_bezier>)) -- アンチエイリアスをかけたベジエ曲線を描く
  * ((<SDL::Surface#draw_bezier_alpha>)) -- ベジエ曲線をアルファブレンディングして描く
  * ((<SDL::Surface#draw_aa_bezier_alpha>)) -- アンチエイリアスしたベジエ曲線をアルファブレンディングして描く
  * ((<SDL::Surface#transform_surface>)) -- 拡大縮小変形した新しいサーフェスを生成する

== Video Subsystem 概要
SDL は表示フレームバッファに対するとてもシンプルなインターフェースを
提供します。
フレームバッファはあなたが直接書くことができる
オフスクリーンサーフェスとして表現されます。
スクリーンに書いたものを画面に表示させるには、
画面の必要な部分が更新されることを保証する
((<更新|SDL::Screen#update_rect>))関数を呼んで下さい。

Ruby/SDL のいかなるビデオ関連メソッドを呼ぶ前に、
最初に ((<SDL.init>))(SDL::INIT_VIDEO)を呼ばなければいけません。
これは SDL 内のビデオとイベントを初期化します。

アプリケーションでサウンドとビデオを共に使うときは、
サウンドデバイスをオープンする前に
((<SDL.init>))(SDL::INIT_AUDIO|SDL::INIT_VIDEO)
を呼ぶ必要があります。
そうしないと、Win32 の DirectX において
フルスクリーン表示モードにセットすることができないでしょう。

ライブラリを初期化した後は、ビデオ表示を順番にスタートさせることができます。
最も簡単な方法は、共通のスクリーン解像度とピクセル深度を選び、
エラーをチェックしつつビデオを初期化することです。
おそらくあなたが望んだものが得られるでしょうが、
SDL はあなたが求めたモードをエミュレートし、
更新の際に変換しているかもしれません。
最もよい方法は、
望まれるものに最も近いビデオモードを
((<問い合わせ|SDL.video_info>))、
そのピクセルフォーマットに合わせて画像を
((<変換|SDL::Surface#display_format>))することです。

SDL は現在 1 ピクセル 8 bit 以上のいかなるピクセル深度もサポートしています。
8 bpp のフォーマットは 8 bit のパレットモードとしてみなされ、
12, 15, 16, 24, そして 32 bpp は
「パックドピクセル」モードとしてみなされます。
これは、個々のピクセルが RGB 各チャンネルの輝度を
ピクセルのビットの中にパッキングして持っているということです。

ビデオモードを初期化した後は、
返値として得られたサーフェスに対し、他のフレームバッファのように書き込み、
いつものように更新処理を呼ぶことができます。

== SDL::Surface
絵のサーフェスを表わすクラスです。

このクラスは描画される「絵」のメモリを表現しています。

メソッドおよびクラスメソッドのリスト
* ((<SDL::Surface#set_colors>)) -- 与えられた 8 bit サーフェスのカラーマップの一部をセットします。
* ((<SDL::Surface#set_palette>)) -- 8 ビットサーフェスのパレットに色をセットします。
* ((<SDL::Surface#map_rgb>)) -- RGB カラー値をピクセルフォーマットに写像します。
* ((<SDL::Surface#map_rgba>)) -- RGBA カラー値をピクセルフォーマットに写像します。
* ((<SDL::Surface#get_rgb>)) -- 指定されたピクセルフォーマット内のピクセルから RGB 値を取得します。
* ((<SDL::Surface#get_rgba>)) -- 指定されたピクセルフォーマット内のピクセルから RGBA 値を取得します。
* ((<SDL::Surface.new>)) -- 空の ((<SDL::Surface>)) のインスタンスを生成します。
* ((<SDL::Surface.new_from>)) -- ピクセルデータから ((<SDL::Surface>)) のインスタンスを生成します。
* ((<SDL::Surface#lock>)) -- 直接アクセスのためにサーフェスをロックします。
* ((<SDL::Surface#unlock>)) -- 以前にロックされたサーフェスのロックを解除します。
* ((<SDL::Surface#must_lock?>)) -- ロックが必要かどうかを返します。
* ((<SDL::Surface.load_bmp>)) -- Windows の BMP ファイルをサーフェスにロードします。
* ((<SDL::Surface.load_bmp_from_io>)) -- RubyのIOオブジェクトから BMP ファイルをサーフェスにロードします。
* ((<SDL::Surface#save_bmp>)) -- サーフェスを Windows の BMP ファイルとしてセーブします。
* ((<SDL::Surface#set_color_key>)) -- blit 転送可能なサーフェスのカラーキー(透明ピクセル)と、RLE アクセラレーションをセットします。
* ((<SDL::Surface#set_alpha>)) -- サーフェスのアルファ値を調整します。
* ((<SDL::Surface#set_clip_rect>)) -- サーフェスのクリッピング矩形をセットします。
* ((<SDL::Surface#get_clip_rect>)) -- サーフェスのクリッピング矩形を取得します。
* ((<SDL::Surface#fill_rect>)) -- 与えられた矩形領域と色で高速な塗り潰しを行います。
* ((<SDL::Surface#display_format>)) -- サーフェスを表示フォーマットに変換します。
* ((<SDL::Surface#display_format_alpha>)) -- サーフェスを表示フォーマットに変換します。
* ((<SDL::Surface#flags>)) -- サーフェスのフラグ
* ((<SDL::Surface#w>)) -- サーフェスの幅
* ((<SDL::Surface#h>)) -- サーフェスの高さ
* ((<SDL::Surface#pixels>)) -- 実際のピクセルデータを返します
* ((<SDL::Surface#Rmask>)) -- 赤チャンネルの値を取得するのに使われるビットマスク
* ((<SDL::Surface#Gmask>)) -- 緑チャンネルの値を取得するのに使われるビットマスク
* ((<SDL::Surface#Bmask>)) -- 青チャンネルの値を取得するのに使われるビットマスク
* ((<SDL::Surface#Amask>)) -- αチャンネルの値を取得するのに使われるビットマスク
* ((<SDL::Surface#colorkey>)) -- 透明ピクセルのピクセル値
* ((<SDL::Surface#alpha>)) -- サーフェス全体のα値
* ((<SDL::Surface#bpp>)) -- サーフェスの各ピクセルを表わすのに使われるビット数
* ((<SDL::Surface.load>)) -- 画像をサーフェスにロードします。
* ((<SDL::Surface.load_from_io>)) -- RubyのIOオブジェクトから画像をサーフェスにロードします。
* ((<SDL::Surface#put_pixel>)) -- 指定した位置に点を書きます。
* ((<SDL::Surface#get_pixel>)) -- 指定した位置のピクセル値を得ます。
* ((<SDL::Surface#put>)) -- 指定したサーフェス全体を指定した位置に高速 blit 転送します。
* ((<SDL::Surface#copy_rect>)) -- サーフェスの一部を切り出した新しいサーフェスを返します。
* ((<SDL::Surface#draw_line>)) -- 直線を描画します。
* ((<SDL::Surface#draw_aa_line>)) -- アンチエイリアシングされた直線を描画します。
* ((<SDL::Surface#draw_line_alpha>)) -- アルファブレンディングした直線を描画します。
* ((<SDL::Surface#draw_aa_line_alpha>)) -- アルファブレンディングした直線を描画します。
* ((<SDL::Surface#draw_rect>)) -- 長方形を描画します。
* ((<SDL::Surface#draw_rect_alpha>)) -- 長方形をアルファブレンディング描画します。
* ((<SDL::Surface#draw_filled_rect_alpha>)) -- 塗り潰した長方形をアルファブレンディング描画します。
* ((<SDL::Surface#draw_circle>)) -- 円を描画します。
* ((<SDL::Surface#draw_filled_circle>)) -- 塗り潰した円を描画します。
* ((<SDL::Surface#draw_aa_circle>)) -- アンチエイリアスをかけた円を描画します。
* ((<SDL::Surface#draw_aa_filled_circle>)) -- 塗り潰した円をアンチエイリアスをかけて描画します。
* ((<SDL::Surface#draw_circle_alpha>)) -- 円をアルファブレンディング描画します。
* ((<SDL::Surface#draw_filled_circle_alpha>)) -- 塗り潰した円をアルファブレンディング描画します。
* ((<SDL::Surface#draw_aa_circle_alpha>)) -- 円をアルファブレンディング、アンチエイリアス描画します。
* ((<SDL::Surface#draw_ellipse>)) -- 楕円を描画します。
* ((<SDL::Surface#draw_filled_ellipse>)) -- 塗り潰した楕円を描画します。
* ((<SDL::Surface#draw_aa_ellipse>)) -- アンチエイリアスをかけた楕円を描画します。
* ((<SDL::Surface#draw_aa_filled_ellipse>)) -- 塗り潰した楕円をアンチエイリアスをかけて描画します。
* ((<SDL::Surface#draw_ellipse_alpha>)) -- 楕円をアルファブレンディング描画します。
* ((<SDL::Surface#draw_filled_ellipse_alpha>)) -- 塗り潰した楕円をアルファブレンディング描画します。
* ((<SDL::Surface#draw_aa_ellipse_alpha>)) -- 楕円をアルファブレンディング、アンチエイリアス描画します。
* ((<SDL::Surface#draw_bezier>)) -- ベジエ曲線を描く
* ((<SDL::Surface#draw_aa_bezier>)) -- アンチエイリアスをかけたベジエ曲線を描く
* ((<SDL::Surface#draw_bezier_alpha>)) -- ベジエ曲線をアルファブレンディングして描く
* ((<SDL::Surface#draw_aa_bezier_alpha>)) -- アンチエイリアスしたベジエ曲線をアルファブレンディングして描く
* ((<SDL::Surface#transform_surface>)) -- 拡大縮小変形した新しいサーフェスを生成する

== SDL::Screen
画面に対応するサーフェスを表わすクラスです。

このクラスは ((<SDL::Surface>)) のサブクラスであり、実際に画面に表示される
サーフェスを表わします。

ビデオフレームバッファは ((<SDL.set_video_mode>)) と ((<SDL.get_video_surface>))
から得られます。

メソッドおよびクラスメソッドのリスト
* ((<SDL::Screen#update_rect>)) -- 与えられた領域の画面を更新します。
* ((<SDL::Screen#flip>)) -- スクリーンバッファを交換します。

== SDL::VideoInfo
ビデオターゲットの情報を表わすクラスです。
このクラスのインスタンスは ((<SDL.video_info>)) から返り値として得られます。
これは以下のメソッドを持ちます。

--- SDL::VideoInfo#hw_available

    ハードウェアサーフェスを作ることは可能かどうか

--- SDL::VideoInfo#wm_available

    ウィンドウマネージャが利用できるかどうか

--- SDL::VideoInfo#blit_hw

    ハードウェア間の blit はアクセラレーションが有効かどうか

--- SDL::VideoInfo#blit_hw_CC

    ハードウェア間のカラーキー blit はアクセラレーションが有効かどうか

--- SDL::VideoInfo#blit_hw_A

    ハードウェア間のα blit はアクセラレーションが有効かどうか

--- SDL::VideoInfo#blit_sw

    ソフトウェアからハードウェアへの blit はアクセラレーションが有効かどうか

--- SDL::VideoInfo#blit_sw_CC

    ソフトウェアからハードウェアへのカラーキー blit はアクセラレーション
    が有効かどうか

--- SDL::VideoInfo#blit_sw_A

    ソフトウェアからハードウェアへのα blit はアクセラレーションが有効かどうか

--- SDL::VideoInfo#blit_fill

    色の塗潰しはアクセラレーションが有効かどうか

--- SDL::VideoInfo#video_mem

    ビデオメモリの総容量(Kbyte)

--- SDL::VideoInfo#bpp

    一ピクセルあたりのバイト数


== 色、ピクセルフォーマット、ピクセル値について
まずは Ruby/SDL において重要なことを先に書きます。
Ruby/SDLにおいて色はRGBAそれぞれ0から255までの値を取ります。
性能のため SDL 内部ではRGBA値を32ビット符号無し整数でパッキングします。
このRGBA値と符号無し32ビット整数との変換規則をピクセルフォーマットと
呼び、変換後の値をピクセル値と呼びます。
ピクセルフォーマットはサーフェスごとに決まっていて、
変換は((<SDL::Surface#map_rgb>))、((<SDL::Surface#map_rgba>))、
((<SDL::Surface#get_rgb>))、((<SDL::Surface#get_rgba>))というメソッドでします。
メソッドの引数などで色を指定する場合、[231, 251, 100] というような
要素が3個の配列(RGB,A=255)、
[231, 251, 100, 128]という要素が4個の配列(RGBA)、もしくはピクセル値の
いずれでも使えます。またメソッドの返り値として色情報が得られる場合は
通常ピクセル値が得られます。

以下はより基本的でより詳しい内容です。

Ruby/SDLにおける絵は、ピクセルの集合として表されます。
ピクセルと呼ばれる小さな正方形を縦横に並べ、そのそれぞれに
色をわりあてることで画像を表現します。
例えば 640x480 の絵は 307200個 = 640×480 のピクセルで表わされます。

そして、その色は光の3原色である赤(Red)、緑(Green)、青(Blue)それぞれの値
を0から255までで指定することで決めます。例えば [R,G,B] = [0,0,0] ならば黒、
[255, 255, 0]ならば黄色、[160, 32, 240]で紫、などです。

そしてこの情報をバイト列に変換して保存します。一つのピクセルに対し
8ビット、16ビット、24ビット、もしくは32ビットのメモリを割当て、
R,G,Bの 255*255*255の情報を適当にそのメモリに収まるように変換します。
このビット数をbpp(Bits Per Pixel)と呼びます。
そしてこの色の情報 -> バイト列の変換規則をピクセルフォーマットと呼びます。
また、ピクセル1個分の色データをピクセルフォーマットで変換したものを
ピクセル値と呼びます。性能のため SDL 内部ではこのピクセル値を
よく利用します。
それぞれのサーフェスは、このピクセルフォーマットと「絵を表わすバイト列」
の組であると解釈できます。

この色データとピクセル値の相互変換は
((<SDL::Surface#map_rgb>))、((<SDL::Surface#get_rgb>))というメソッドでします。

また、各メソッドの引数で色を指定する場合は、[r, g, b]という要素が整数3個の
配列、もしくはそのサーフェスのピクセルフォーマットで変換したピクセル値の
どちらでも使える場合がほとんどです。

最後にα値について解説します。この値はある画像と別の画像を重ね合わせる
時に意味のある値です。((<SDL.blit_surface>))などで2つの画像が重ね合わされる場合、
通常下の画像は上の画像で完全に隠されてしまいます。しかし上の画像に
α値を指定しておくと、上の画像の色と下の画像の色が混ぜ合されます。
この混ぜ合せの割合をα値と呼びます。SDLではα値は0から255までの値をとりえます。
0が完全な透明で、255が完全な不透明です。
この値はbppが32の場合には、各ピクセルごとに指定することができます。
つまりピクセル値には R,G,B のほかアルファ(Alpha)値を含めることができると
いうことです。このα値を含めた変換には
((<SDL::Surface#map_rgba>))、[Surface#get_rgba]を使います。
また各メソッドの引数でアルファ付きの色を指定する場合は、[r,g,b,a]という
要素が整数4個の配列を使うことが可能です。

== Methods 

--- SDL.get_video_surface
--- SDL.getVideoSurface

    このメソッドは現在の表示サーフェスを返します。
    SDL が表示サーフェス上でフォーマット変換を行っている場合は、
    この関数は実際のビデオサーフェスではなく、(SDL を使う側に
    見せている) 変換前のサーフェスを返します。

    ((<SDL::Screen>))のインスタンスを返します。

    失敗したときには例外((<SDL::Error>))を発生させます。

--- SDL.video_info
--- SDL.videoInfo

    この関数はビデオハードウェアに関する((<情報|SDL::VideoInfo>))を返します。
    
    ((<SDL.set_video_mode>))の前にこれが呼ばれると、
    返されたオブジェクトのbppアトリビュートには
    「最も適した」ビデオモードのピクセルフォーマットが入ります。

    情報を((<SDL::VideoInfo>))のインスタンスで返します。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * See Also
      
      ((<SDL.set_video_mode>)), ((<SDL::VideoInfo>))

--- SDL.video_driver_name
--- SDL.videoDriverName

    ドライバ名は "x11" や "windib" のように単なる 1 語の識別子です。

    ドライバ名を文字列で返します。

    ビデオがまだ((<SDL.init>))で初期化されていないなら例外((<SDL::Error>))を発生させます。

    * See Also
      
      ((<SDL.init>))

--- SDL.list_modes(flags)
--- SDL.listModes(flags)

    与えられたビデオのフラグに対し、
    利用可能な画面モードの配列を返します。
    
    フラグは((<SDL.set_video_mode>))
    で使われるものと同じであり、モードが有効かどうかを決定する際に
    強い役割を果たします。
    SDL::HWSURFACEをフラグとして渡すと、
    ハードウェアのビデオサーフェスがサポートするモードだけが返されます。

    大きい方から小さい方にソートされています。
    ある特定のフォーマットに対し利用可能なモードがない場合は
    nil を返し、
    与えられたフォーマットに対しどのモードでも OK の場合は
    true を返します。
    利用可能なモードが有限個しか存在しない場合は、
    [縦方向の解像度, 横方向の解像度]という配列の配列を返します。


    EXAMPLE
      # 利用可能なフルスクリーンハードウェアモードを取得する
      modes = SDL.list_modes(SDL::FULLSCREEN|SDL::HWSURFACE)
      
      # 利用可能なモードがあるかどうかチェック
      if modes == nil
        puts "利用可能なモードがありません!"
        exit 1
      end
      
      # 解像度が制限されているかどうかチェック
      if modes == true
        puts "全解像度が利用可能です。"
      else
        # 有効なモードを表示
        puts "利用可能なモード"
        modes.each{|w, h| puts "  #{w} x #{h}"}
      end

    * See Also
      
      ((<SDL.set_video_mode>)), ((<SDL.video_info>))

--- SDL.check_video_mode(w,h,bpp,flags)
--- SDL.checkVideoMode(w,h,bpp,flags)

    要求されたモードがどのピクセル深度においてもサポートされていない場合は
    0を返し、
    あるいは与えられた横幅・高さと
    要求された((<サーフェス|SDL::Surface>)) フラグ(((<SDL.set_video_mode>))を見て下さい)
    において利用可能な最も近いピクセル深度を返します。
    
    ピクセル深度の値は推奨されるモードに過ぎません。
    ビデオモードの((<設定|SDL.set_video_mode>))時に
    普通にあなたの望むピクセル深度を要求することができ、
    SDL はシャドウビデオサーフェスを使ってそのピクセル深度を
    エミュレートするでしょう。


    EXAMPLE
      puts "640x480@16bpp のモードをチェックしています。"
      bpp = SDL.check_video_mode(640, 480, 16, SDL::HWSURFACE)
      if bpp == 0
        puts "利用可能なモードではありません。"
        exit 1
      end
      
      puts "SDL は 640x480@#{bpp}bpp を推奨します。"
      screen = SDL.set_video_mode(640, 480, bpp, SDL_HWSURFACE)

    * See Also
      
      ((<SDL.set_video_mode>)), ((<SDL.video_info>))

--- SDL.setVideoMode(w,h,bpp,flags)
--- SDL.set_video_mode(w,h,bpp,flags)

    指定された幅・高さ・ピクセル深度(1ピクセルのビット数)を用いて
    ビデオモードを設定します。
    ((|bpp|)) が 0 ならば、現在表示されているピクセル深度として扱われます。
    
    ((|flags|)) パラメータは((<SDL::Surface#flags>))と同じです。
    以下の値の OR による組み合わせが有効です。
    
    :SDL::SWSURFACE
      システムメモリからビデオサーフェスを作成します。
    :SDL::HWSURFACE
      ビデオメモリからビデオサーフェスを作成します。
    :SDL::ASYNCBLIT
      表示サーフェスの非同期更新の使用を有効にします。
      これは通常、単一 CPU における blit 転送は遅くなりますが、
      SMP システムにおいてスピードの向上をもたらすかも知れません。
    :SDL::ANYFORMAT
      普通は、もし要求されたピクセル深度のビデオサーフェス
      (((|bpp|))) が使えない場合は、
      SDL はシャドウサーフェスでこれをエミュレートします。
      SDL::ANYFORMATはこれを禁止し、
      SDL はピクセル深度とは無関係にビデオサーフェスを使うことになります。
    :SDL::HWPALETTE
      SDL がパレットに対する排他的なアクセスをできるようにします。
      このフラグがないと、
      ((<SDL::Surface#set_colors>))や((<SDL::Surface#set_palette>))を用いて要求した色が、
      常に取得できるとは限りません。
    :SDL::DOUBLEBUF
      ハードウェアによるダブルバッファを有効にします。
      (SDL::HWSURFACE と一緒の時のみ)
      ((<SDL::Screen#flip>)) の呼び出し
      によってバッファを切り替え、画面を更新します。
      全ての描画は、その瞬間に表示されていない方のサーフェスに行われます。
      ダブルバッファを有効にできなかった場合は、
      ((<SDL::Screen#flip>)) は画面全体に対し単に((<SDL::Screen#update_rect>))を行います。
    :SDL::FULLSCREEN
      SDL はフルスクリーンモードの使用を試みます。
      どういう理由であれ、ハードウェアによる解像度変更ができない場合は
      一段階解像度の高いモードが使われ、黒い背景の中央に表示ウインドウが置かれます。
    :SDL::OPENGL
      OpenGL の描画コンテキストを作成します。
      前もって((<SDL.set_GL_attr>))によって OpenGL のビデオ属性を
      設定しておく必要があります。
    :SDL::OPENGLBLIT
      上と同様に OpenGL の描画コンテキストを作成しますが、
      通常の blit 転送を可能にします。
      画面(2D)のサーフェスはαチャンネルを持つことが可能で、
      画面のサーフェスへの変更を更新するために、
      ((<SDL::Screen#update_rect>))を使わなければいけません。
      注意: このオプションは互換性のためにのみ
      残されており、新しいコードでこの機能を使うことは
      ((*推奨されていません*))。
    :SDL::RESIZABLE
      リサイズ可能なウィンドウを作成します。
      ユーザーの手でウィンドウがリサイズされた場合は、
      ((<SDL::Event2::VideoResize>))イベントが発生し、
      新しいサイズで ((<SDL.set_video_mode>))が再度呼ばれることがあります。
    :SDL::NOFRAME
      もし可能であれば、
      SDL がタイトルバーなし、あるいはフレームによる装飾なしの
      ウィンドウが生成することになります。
      フルスクリーンモードの場合自動的にこのフラグを設定します。

    フレームバッファのサーフェスを((<SDL::Screen>))のインスタンスで返します。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * NOTES

      SDL.set_video_modeがどの((|flags|))をを満たすことができたかは、
      返り値のサーフェスの((<SDL::Surface#flags>))にセットされています。
      
      ((|bpp|)) パラメータはピクセルごとのビット数です。
      そのため、((|bpp|)) が 24 の場合は 3 バイト/ピクセルの
      パッキングされた表現方法が使われます。
      より一般的な 4 バイト/ピクセルのモードについては、
      ((|bpp|)) が 32 の場合に使われます。
      幾分奇妙ですが、15 と 16 の場合はいずれも 2 バイト/ピクセルのモードを
      要求しますが、異なるピクセルフォーマットです。

    * See Also
      
      ((<SDL::Surface#lock>)), ((<SDL::Surface#set_colors>)), ((<SDL::Screen#flip>)), ((<SDL::Screen>))

--- SDL::Screen#updateRect(x,y,w,h)
--- SDL::Screen#update_rect(x,y,w,h)

    与えられた領域の画面を更新します。
    矩形は画面の境界内の収まっていなければなりません。
    (つまりクリッピングはされません)
    
    ((|x|))、((|y|))、((|w|))、((|h|))がすべて 0 ならば、画面全体を更新します。
    
    この関数は((|self|))が((<ロック|SDL::Surface#lock>))されている間は呼んでは
    いけません。

    * See Also
      
      ((<SDL::Surface#lock>))

--- SDL::Screen#flip

    ダブルバッファをサポートするハードウェアにおいて、
    この関数は切替を設定して帰ってします。
    ハードウェアは垂直帰線区間を待ち、
    次のビデオサーフェスの blit 転送やロックが戻る前に
    ビデオバッファを交換します。
    ダブルバッファをサポートしないハードウェアにおいては、
    ((|self|)).update_rect(0, 0, 0, 0) を呼ぶのと同等です。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * See Also
      
      ((<SDL.set_video_mode>)), ((<SDL::Screen#update_rect>))

--- SDL::Surface#set_colors(colors,firstcolor)
--- SDL::Surface#setColors(colors,firstcolor)

    ((|self|)) が現在の表示と関連付けられたサーフェスの場合は、
    表示カラーマップは要求された色で更新されます。((<SDL.set_video_mode>)) フラグに
    SDL::HWPALETTE がセットされていた場合は、
    SDL::Surface#set_colors は常にtrueを返し、
    ウィンドウのカラーマップが歪められていたり、
    エミュレーションの下で動いている場合でも、
    パレットはあなたが望んだ通りにセットされることが保証されています。
    
    ((|colors|))として色情報の配列を与える必要があります。色情報とは
    R、G、Bそれぞれ0から255までの値を持つ要素が3個の配列です。
    
    SDL::HWPALETTE がセットされた、パレット化された(8 bit)
    画面サーフェスには 2 種類のパレット、すなわち
    サーフェスに対する(あるいはサーフェスからの)マッピング blit に
    使われる論理パレットと、
    ハードウェアが色を画面にどうマッピングするかを決定する物理パレット
    とがあります。
    SDL::Surface#SDL_set_colors は(存在するなら)双方のパレットを変更します。
    これは (SDL::LOGPAL | SDL::PHYSPAL) を
    ((|flags|)) にセットして ((<SDL::Surface#set_palette>)) を呼ぶのと同等です。

    ((|self|)) がパレット化されたサーフェスではない場合は、
    この関数は何もせず、false を返します。
    全ての色がこのメソッドに
    渡した通りにセットされた場合は、true を返します。
    必ずしも全ての色エントリが与えられた通りにセットされた訳ではない場合は、
    false を返すので、
    実際の色パレットを決めるサーフェスパレットを見る必要があります。


    EXAMPLE
      # グレースケールのパレットでサーフェスを作成
      
      # 色情報で埋める
      colors = Array.new(256){|i| [i, i, i]}
      # 表示サーフェスを作成
      screen = SDL.set_video_mode(640, 480, 8, SDL::HWPALETTE)
      
      # パレットのセット
      screen.set_colors(colors, 0)

    * See Also
      
      ((<SDL::Surface#set_palette>)), ((<SDL.set_video_mode>))

--- SDL::Surface#set_palette(flags,colors,firstcolor)
--- SDL::Surface#setPalette(flags,colors,firstcolor)

    与えられた 8 ビットサーフェスに対し、パレットの一部をセットします。
    
    SDL::HWPALETTE フラグがセットされている
    パレット(8ビット) の画面サーフェスには
    2種類のパレットがあります。
    すなわち、サーフェスからの(あるいはサーフェスに対する) blit 転送を
    マッピングする論理パレットと、
    ハードウェアが色を画面にマッピングする方法を決定する
    物理パレットです。
    ((<SDL.blit_surface>)) は
    サーフェスのピクセルフォーマット間で変換が必要な場合、
    サーフェスを blit 転送する際に常に論理パレットを使います。
    このため、さまざまな特殊色効果
    (画面のフェード・カラーフラッシュ・画面の霞み)を得るために
    パレットを片方だけ変更することはしばしば有用です。
    
    この関数は
    SDL::LOGPAL か SDL::PHYSPAL を
    ((|flags|)) に指定することで、
    論理または物理パレットのいずれかを変更することができます。
    ((|self|))が現在の表示と
    関連付けられているサーフェスのときは、
    表示のカラーマップは要求された色で更新されます。
    ((<SDL.set_video_mode>)) に
    SDL::HWPALETTE がセットされていた場合は、
    このメソッドは常に true を返し、
    ウィンドウのカラーマップが歪められなければならない場合や、
    エミュレーション下で動いている場合であっても、
    パレットにはあなたが望んだ方法でセットされることが保証されます。
    
    ((|colors|))として色情報の配列を与えます。色情報とは
    R、G、Bそれぞれ0から255までの値を持つ要素が3個の配列です。
    256**3 = 16777216色が使えます。

    ((|self|))がパレット化されたサーフェスでない場合は、
    この関数は false を返して何もしません。
    全ての色がこのメソッドに渡された通りにセットされると、
    true を返します。
    必ずしも全ての色エントリが与えられた通りにセットされた訳ではない場合は、
    false を返すので、
    実際の色パレットを決定するサーフェスパレットを見る必要があります。


    EXAMPLE
      # グレースケールのパレットでサーフェスを作成
      
      # 色情報で埋める
      colors = Array.new(256){|i| [i, i, i]}
      # 表示サーフェスを作成
      screen = SDL.set_video_mode(640, 480, 8, SDL::HWPALETTE)
      
      # パレットのセット
      screen.set_palette(SDL::LOGPAL|SDL::PHYSPAL, colors, 0)

    * See Also
      
      ((<SDL::Surface#set_colors>)), ((<SDL.set_video_mode>))

--- SDL.set_gamma(redgamma,greengamma,bluegamma)
--- SDL.setGamma(redgamma,greengamma,bluegamma)

    各カラーチャンネルについて、表示用の「ガンマ関数」をセットします。
    ガンマは画面に表示される色の明るさ・コントラストを制御します。
    ガンマ値 1.0 は単位元です。
    (つまり、何の調整も行われません)
    
    この関数は「ガンマ関数」のパラメータに基いてガンマを調整します。
    ((<SDL.set_gamma_ramp>)) を使うと、
    ガンマ調整の参照テーブルを直接指定することができます。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * NOTES

      全ての表示ハードウェアがガンマを変更することができるわけではありません。

    * See Also
      
      ((<SDL.get_gamma_ramp>)), ((<SDL.set_gamma_ramp>))

--- SDL.get_gamma_ramp
--- SDL.getGammaRamp

    現在表示に使われているガンマ値の変換テーブルを取得します。
    それぞれのテーブル(R, G, B)は 256 個の16bit符号なし整数値の配列です。

    3個の「256個の16bit符号なし整数値の配列」の配列を返します。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * NOTES

      全ての表示ハードウェアがガンマを変換できるわけではありません。

    * See Also
      
      ((<SDL.set_gamma>)), ((<SDL.set_gamma_ramp>))

--- SDL.set_gamma_ramp(table)
--- SDL.setGammaRamp(table)

    各色チャンネルについて、表示用のガンマ参照テーブルをセットします。
    引数 ((|tables|)) は ((<SDL.get_gamma_ramp>)) と同じフォーマットで、
    対応するチャンネルの入力と出力間の写像を表現します。
    入力は配列に対するインデックスであり、出力はそのインデックスにおける
    16 ビットのガンマ値で、出力の色精度に合わせてスケーリングされます。
    
    この関数は参照テーブルに基いてガンマを調整しますが、
    ((<SDL.set_gamma>)) を用いて
    「ガンマ関数」パラメータに基いて計算されたガンマも持つことができます。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * See Also
      
      ((<SDL.set_gamma>)), ((<SDL.get_gamma_ramp>))

--- SDL::Surface#map_rgb(r,g,b)
--- SDL::Surface#mapRGB(r,g,b)

    RGB カラーの値を((|self|))のピクセルフォーマットに写像し、
    ピクセル値を 32bit 符号無し整数 として返します。
    ((|r|))、((|g|))、((|b|)) は0から255までの値をとれます。
    
    フォーマットがパレット (8ビット) を持つ場合は、
    パレット内において最も近い色のインデックスが返されます。
    
    指定されたピクセルフォーマットがαチャンネルを持つ場合は、
    全て 1 のビット(完全に不透明)として返されます。

    与えられたピクセルフォーマット上において、
    与えられた RGB カラー値を最も良く近似するピクセル値です。
    ピクセルフォーマットのピクセル深度が 32bpp より小さい場合は、
    返値の使用されていない上位ビットは安全に無視することができます。
    (例えば、16bpp のフォーマットでは返値は 2**16 より小さく、
    8bpp では 2**8 より小さい)

    * See Also
      
      ((<SDL::Surface#get_rgb>)), ((<SDL::Surface#get_rgba>)), ((<SDL::Surface#map_rgba>)), ((<色、ピクセルフォーマット、ピクセル値について>))

--- SDL::Surface#map_rgba(r,g,b,a)
--- SDL::Surface#mapRGBA(r,g,b,a)

    RGBA カラーの値を((|self|))のピクセルフォーマットに写像し、
    ピクセル値を 32bit 符号無し整数 として返します。
    ((|r|))、((|g|))、((|b|))、((|a|)) は0から255までの値をとれます。
    
    フォーマットがパレット (8ビット) を持つ場合は、
    パレット内において最も近い色のインデックスが返されます。
    
    指定されたピクセルフォーマットがαチャンネルを持たない場合は、
    (パレットを持つフォーマットの中でそうであるように)
    α値は無視されます。

    与えられたピクセルフォーマット上において、
    与えられた RGBA カラー値を最も良く近似するピクセル値です。
    ピクセルフォーマットのピクセル深度が 32bpp より小さい場合は、
    返値の使用されていない上位ビットは安全に無視することができます。
    (例えば、16bpp のフォーマットでは返値は 2**16 より小さく、
    8bpp では 2**8 より小さい)

    * See Also
      
      ((<SDL::Surface#get_rgb>)), ((<SDL::Surface#get_rgba>)), ((<SDL::Surface#map_rgb>)), ((<色、ピクセルフォーマット、ピクセル値について>))

--- SDL::Surface#get_rgb(pixel)
--- SDL::Surface#getRGB(pixel)

    ((|self|))のピクセルフォーマットによるピクセル値から
    RGB 各チャンネルの値を要素数3の配列で取得します。
    
    このメソッドは
    RGB 各チャンネルが 8 ビット未満のピクセルフォーマットから
    色チャンネルを変換する際にも 8 ビット全体 [0〜255] の範囲を使います。
    (例えば、16 ビット RGB565 フォーマットにおける完全な白色は
    [0xf8, 0xfc, 0xf8] ではなく [0xff, 0xff, 0xff] を返します)

    * See Also
      
      ((<SDL::Surface#get_rgba>)), ((<SDL::Surface#map_rgb>)), ((<SDL::Surface#map_rgba>)), ((<色、ピクセルフォーマット、ピクセル値について>))

--- SDL::Surface#get_rgba(pixel)
--- SDL::Surface#getRGBA(pixel)

    指定されたピクセルフォーマットに格納されたピクセルから
    RGBA 各チャンネルの値を要素数4の配列で取得します。
    
    RGB 各チャンネルが 8 ビット未満のピクセルフォーマットから
    色チャンネルを変換する際にも 8 ビット全体 [0〜255] の範囲を使います。
    (例えば、16 ビット RGB565 フォーマットにおける完全な白色は
    [0xf8, 0xfc, 0xf8] ではなく [0xff, 0xff, 0xff] を返します)
    
    サーフェスにαチャンネルがない場合は、αには 0xff (100% 不透明) が返されます。

    * See Also
      
      ((<SDL::Surface#get_rgba>)), ((<SDL::Surface#map_rgb>)), ((<SDL::Surface#map_rgba>)), ((<色、ピクセルフォーマット、ピクセル値について>))

--- SDL::Surface.new(flags,w,h,depth,Rmask,Gmask,Bmask,Amask)

    大きさが ((|w|)) x ((|h|)) の空のサーフェスを確保します。
    (((<SDL.set_video_mode>))の後で呼ばれなければいけません)
    
    ((|depth|)) が 8 ビットの場合は、
    サーフェスに空のパレットが確保されます。
    そうでない場合は、
    与えられた((|Rmask|))、((|Gmask|))、((|Bmask|))、((|Amask|)) を使って
    「パッキングされたピクセル」が作られます。
    ((|flags|)) は作られるサーフェスのタイプを指定し、
    以下の取りうる値の OR による組み合わせとなります。
    
    :SDL::SWSURFACE
      SDL はシステムメモリからサーフェスを作ります。
      ピクセルレベルのアクセスのパフォーマンスを向上されますが、
      いくつかのハードウェアによる blit 転送の
      利点を得ることができなくなるかも知れません。
    :SDL::HWSURFACE
      SDL はビデオメモリからサーフェスを作ろうとします。
      これにより SDL はビデオメモリ同士の bilt 転送
      (しばしばアクセラレーションが利きます) の利点を得ることができます。
    :SDL::SRCCOLORKEY
      このフラグはサーフェスを blit する際にカラーキーを有効にします。
      SDL::HWSURFACE も指定されており、
      カラーキー付きの blit 転送もハードウェアによるアクセラレーションが利く場合は、
      SDL はサーフェスをビデオメモリに作ろうとします。
      サーフェスを作った後にこのフラグをセット・リセットしたい場合は
      ((<SDL::Surface#set_color_key>)) を使って下さい。
    :SDL::SRCALPHA
      このフラグはサーフェスからの blit 転送におけるαブレンディングを有効にします。
      SDL::HWSURFACE も指定され、
      αブレンディング blit 転送がハードウェアによるアクセラレーションが利く場合は
      サーフェスはなるだけビデオメモリに置かれます。
      サーフェスを作った後にこのフラグをセット・リセットしたい場合は
      ((<SDL::Surface#set_alpha>))を使って下さい。

    ((<SDL::Surface>))のインスタンスを返します。

    失敗したときには例外((<SDL::Error>))を発生させます。


    EXAMPLE
      # テクスチャ用として OpenGL に要求される、
      # 個々々のピクセルのバイトが RGBA の順番で並んだ
      # 32 ビットのサーフェスを生成
      
      big_endian = ([1].pack("N") == [1].pack("L"))
      
      if big_endian
        rmask = 0xff000000
        gmask = 0x00ff0000
        bmask = 0x0000ff00
        amask = 0x000000ff
      else
        rmask = 0x000000ff
        gmask = 0x0000ff00
        bmask = 0x00ff0000
        amask = 0xff000000
      end
      
      surface = SDL::Surface.new(SDL::SWSURFACE, width, height, 32,
                                 rmask, gmask, bmask, amask);

    * NOTES

      αチャンネルが指定されている
      (つまり ((|Amask|)) が 0 でない) 場合は、
      SDL::SRCALPHA フラグは自動的にセットされます。
      サーフェスを作った後は、((<SDL::Surface#set_alpha>))を
      呼ぶことでこのフラグを取り除くことができます。

    * See Also
      
      ((<SDL::Surface.new_from>)), ((<SDL.set_video_mode>)), ((<SDL::Surface#lock>)), ((<SDL::Surface#set_alpha>)), ((<SDL::Surface#set_color_key>))

--- SDL::Surface.new_from(pixels,w,h,depth,pitch,Rmask,Gmask,Bmask,Amask)

    与えられたピクセルデータ(((|pixels|))、 Stringのインスタンス)から
    ((<SDL::Surface>)) のインスタンスを生成します。
    ((|pixels|)) に格納されたデータは ((|depth|)) のものであるとみなされます。
    ((|pitch|)) は各スキャンラインの長さ(バイト数)です。
    
    他のパラメータについての詳しい記述については、((<SDL::Surface.new>))を見てください。

    生成されたサーフェスを返します。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * See Also
      
      ((<SDL::Surface.new>))

--- SDL::Surface#lock

    ピクセルに直接アクセスするためにサーフェスをロックします。
    ((<SDL::Surface#lock>)) と ((<SDL::Surface#unlock>)) の呼びだしの間、
    サーフェスへ直接読み書きができます。
    ひとたびサーフェスへのアクセスが終了したら、
    ((<SDL::Surface#unlock>)) を使って解放する必要があります。
    
    サーフェスへ直接読み書きをする、ロックが必要なメソッドは
    以下の通りです。
    
    * ((<SDL::Surface#pixels>))
    * ((<SDL::Surface#put_pixel>))
    * ((<SDL::Surface#get_pixel>))
    * ((<SDL::Surface#draw_line>))
    * ((<SDL::Surface#draw_aa_line>))
    * ((<SDL::Surface#draw_line_alpha>))
    * ((<SDL::Surface#draw_aa_line_alpha>))
    * ((<SDL::Surface#draw_rect>))
    * ((<SDL::Surface#draw_rect_alpha>))
    * ((<SDL::Surface#draw_filled_rect_alpha>))
    * ((<SDL::Surface#draw_circle>))
    * ((<SDL::Surface#draw_filled_circle>))
    * ((<SDL::Surface#draw_aa_circle>))
    * ((<SDL::Surface#draw_aa_filled_circle>))
    * ((<SDL::Surface#draw_circle_alpha>))
    * ((<SDL::Surface#draw_filled_circle_alpha>))
    * ((<SDL::Surface#draw_aa_circle_alpha>))
    * ((<SDL::Surface#draw_ellipse>))
    * ((<SDL::Surface#draw_filled_ellipse>))
    * ((<SDL::Surface#draw_aa_ellipse>))
    * ((<SDL::Surface#draw_aa_filled_ellipse>))
    * ((<SDL::Surface#draw_ellipse_alpha>))
    * ((<SDL::Surface#draw_filled_ellipse_alpha>))
    * ((<SDL::Surface#draw_aa_ellipse_alpha>))
    * ((<SDL::Surface#draw_bezier>))
    * ((<SDL::Surface#draw_aa_bezier>))
    * ((<SDL::Surface#draw_bezier_alpha>))
    * ((<SDL::Surface#draw_aa_bezier_alpha>))
    * ((<SDL::Surface#transform_surface>))
    
    また((<SDL.auto_lock?>))が真である場合には、ロックが必要なメソッドが呼ばれた
    場合自動的にロックの設定と解放をするため、このメソッドを呼ぶ必要
    はありません。
    
    すべてのサーフェスがロックを必要とする訳ではありません。
    ((<SDL::Surface#must_lock?>))が偽ならば
    いつでも読み書きすることができ、サーフェスのピクセルフォーマット
    は変更されません。
    
    この時間の間にクリティカルなシステムロックが行われることがあるため、
    ロック/アンロック間では、いかなる OS システムコールやライブラリコールも
    呼ばれるべきではありません。
    
    明記しておくべきことに、
    SDL 1.1.8 以降ではサーフェスのロックは再帰的である、という点があります。
    これは複数のサーフェスロックをかけることができるということですが、
    個々のロックには対応するアンロックがなければいけません。
      surface.lock
      # サーフェスはロックされている 
      # ここでサーフェス上の直接ピクセルアクセス
      surface.lock
      # さらにサーフェス上の直接ピクセルアクセス
      surface.unlock
      # サーフェスはまだロックされている
      # 注記: バージョンが 1.1.8 以下の場合は、
      # この段階でサーフェスはもうロックされていない
      surface.unlock
      # サーフェスは今アンロックされている

    サーフェスのロックができなかった場合は例外((<SDL::Error>))を返します。

    * See Also
      
      ((<SDL::Surface#unlock>)), ((<SDL::Surface#must_lock?>)), ((<SDL.auto_lock?>)), ((<SDL.auto_lock_on>)), ((<SDL.auto_lock_off>)), ((<SDL.auto_lock=>))

--- SDL::Surface#unlock

    ((<SDL::Surface#lock>))を使ってロックされたサーフェスは
    このメソッドでロックを解除しなければいけません。
    サーフェスのロックはできるだけ早く解除されるべきです。
    
    1.1.8 以降、サーフェスのロックは再帰的であることに注意すべきです。

    * See Also
      
      ((<SDL::Surface#lock>))

--- SDL::Surface#must_lock?
--- SDL::Surface#mustLock?

    サーフェスのピクセルに直接アクセスするときに ((<SDL::Surface#lock>)) による
    ロックが必要かどうかを true/false で返します。

    * See Also
      
      ((<SDL::Surface#lock>))

--- SDL::Surface.load_bmp(filename)
--- SDL::Surface.loadBMP(filename)

    Windows の BMP ファイルからサーフェスをロードします。

    ((<SDL::Surface>))のインスタンスを返します。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * See Also
      
      ((<SDL::Surface#save_bmp>)), ((<SDL::Surface.load>))

--- SDL::Surface.load_bmp_from_io(io)
--- SDL::Surface.loadBMPFromIO(io)

    RubyのIOオブジェクトから BMP ファイルをサーフェスにロードします。

    ((<SDL::Surface>))のインスタンスを返します。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * NOTES

      RubyのIOオブジェクトとは、read、rewind、tell という3つのメソッドを
      持つオブジェクトです。IO、StringIO、Zlib::GzipReaderなどが
      利用できます。

    * See Also
      
      ((<SDL::Surface.load_bmp>)), ((<SDL::Surface.load_from_io>))

--- SDL::Surface#save_bmp(filename)
--- SDL::Surface#saveBMP(filename)

    ((|self|))の内容をWindows の BMP ファイル ((|filename|)) にセーブします。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * See Also
      
      ((<SDL::Surface.load_bmp>))

--- SDL::Surface#set_color_key(flag,key)
--- SDL::Surface#setColorKey(flag,key)

    blit 転送可能なサーフェスのカラーキー(透明ピクセル)をセットし、
    RLE アクセラレーションを有効または無効にします。
    ((|key|))はピクセル値もしくは色を表す配列で指定できます。
    
    RLE (Run-length encoding) アクセラレーションは、
    透明ピクセル(つまり((|key|))と同じ値のピクセル)が
    水平方向に長く続いている場合に、
    画像の blit 転送を実質スピードアップさせることができます。
    ((|key|))としてピクセル値を使う場合、((|self|))と
    同じピクセルフォーマットのものでなければいけません。
    
    ((|flag|)) が SDL::SRCCOLORKEY ならば、((|key|)) は転送元の画像の透明色です。
    
    ((|flag|)) に SDL::RLEACCEL が
    セットされている場合は、
    ((<SDL.blit_surface>)) で描かれる時に、
    サーフェスは RLE アクセラレーションを使って描きます。
    最初にサーフェスに対して
    ((<SDL.blit_surface>)) か ((<SDL::Surface#display_format>)) が
    呼ばれた時に、実際に RLE アクセラレーションのためエンコードされます。
    
    flag が 0 ならば、この関数は現在のカラーキーをクリアします。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * See Also
      
      ((<SDL.blit_surface>)), ((<SDL::Surface#display_format>)), ((<SDL::Surface#map_rgb>)), ((<SDL::Surface#set_alpha>)), ((<SDL::Surface#colorkey>))

--- SDL::Surface#set_alpha(flags,alpha)
--- SDL::Surface#setAlpha(flags,alpha)

    このメソッドはサーフェス単位のα値をセットしたり、
    αブレンディングを有効に、また無効にするために使われます。
    
    ((|flags|)) は、αブレンディングが使われるべきかどうか
    SDL::SRCALPHA、
    また blit の際に RLE アクセラレーションを使うべきかどうか
    SDL::RLEACCELを指定するのに使われます。
    ((|flags|)) はこれらの 2 つのオプションの OR による
    組み合わせか、どちらか 1 つか、または 0 になり得るでしょう。
    SDL::SRCALPHA がフラグとして渡されないと、
    サーフェスを blit するときに全てのα情報は無視されます。
    ((|alpha|)) パラメータはサーフェス単位のα値です。
    つまり、サーフェス単位のαを使うには、サーフェスのαチャンネルは不要であり、
    blit は未だ SDL::RLEACCEL によってアクセラレートされる
    ことが可能です。
    
    αは以下の方法でサーフェスの blit に影響を及ぼします。
    
    :RGBA->RGB SDL::SRCALPHA あり
      転送元のピクセルはαチャンネルを使って転送先のピクセルとαブレンドされます。
    :RGBA->RGB SDL::SRCALPHA なし
      転送元ピクセルから RGB データがコピーされます。
      転送元のαチャンネルとサーフェス単位のα値は無視されます。
    
    :RGB->RGBA SDL::SRCALPHA あり
      転送元ピクセルはサーフェス単位のα値を使って転送先ピクセルとαブレンドされます。
      SDL::SRCCOLORKEY がセットされている場合は、
      カラーキーの値と一致しないピクセルだけがコピーされます。
      コピーされるピクセルのαチャンネルは不透明にセットされます。
    
    :RGB->RGBA SDL::SRCALPHA なし
      RGB データは転送元のピクセルからコピーされ、コピーされたピクセルのα値は不透明にセットされます。
      SDL::SRCCOLORKEY がセットされている場合は、
      カラーキーの値に一致しないピクセルだけがコピーされます。
    
    :RGBA->RGBA SDL::SRCALPHA あり
      転送元のピクセルはαチャンネルを使って転送先のピクセルとαブレンドされます。
      転送先のピクセルのαチャンネルは変更されません。
      SDL::SRCCOLORKEY は無視されます。
    
    :RGBA->RGBA SDL::SRCALPHA なし
      RGBA データが転送先サーフェスにコピーされます。
      SDL::SRCCOLORKEY がセットされている場合は、
      カラーキーの値と一致しないピクセルだけがコピーされます。
    
    :RGB->RGB SDL::SRCALPHA あり
      転送元ピクセルはサーフェス単位のα値を使って転送先ピクセルとαブレンドされます。
      SDL::SRCCOLORKEY がセットされている場合は、
      カラーキーの値と一致しないピクセルだけがコピーされます。
    
    :RGB->RGB SDL::SRCALPHA なし
      転送元ピクセルから RGB データがコピーされます。
      SDL::SRCCOLORKEY がセットされている場合は、
      カラーキーの値と一致しないピクセルだけがコピーされます。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * NOTES

      この関数と SDL のαブレンディングの意味合いがバージョン 1.1.4 から変わりました。
      バージョン 1.1.5 までは、α値 0 は不透明で、255 は透明とみなされていました。
      これは今では反転されました。
      つまり、0 (SDL::ALPHA_TRANSPARENT) は透明であり、
      255 (SDL::ALPHA_OPAQUE) は不透明とみなされています。
      
      サーフェス単位のα値 128 は特殊な場合とみなされて最適化されるため、
      他の値よりもはるかに高速です。
      
      SDL::SRCALPHA がセットされた状態での RGBA->RGBA の blit は
      転送先サーフェスのαをそのまま維持することに注意して下さい。
      これは、2 つの任意の RGBA サーフェスを合成して
      それらの「重ね合わせ」が期待されるような結果を得ることはできないということです。
      転送先のαはマスクとして働きます。
      
      また、ピクセル単位のαとサーフェス単位のαは合成できないことにも注意して下さい。
      ピクセル単位のαが有効な時は必ずそちらが使われます。

    * See Also
      
      ((<SDL::Surface#map_rgba>)), ((<SDL::Surface#get_rgba>)), ((<SDL::Surface#display_format>)), ((<SDL.blit_surface>)), ((<SDL::Surface#alpha>))

--- SDL::Surface#set_clip_rect(x,y,w,h)
--- SDL::Surface#setClipRect(x,y,w,h)

    サーフェスのクリッピング矩形をセットします。
    このサーフェスが blit 転送の転送先である場合は、
    クリッピング矩形の内部の領域だけが描画されます。
    
    引数によって指定された矩形はサーフェスの端でクリッピングされ、
    サーフェスに対するクリッピング矩形がサーフェスの端に出ないようにします。

    * See Also
      
      ((<SDL::Surface#get_clip_rect>)), ((<SDL.blit_surface>))

--- SDL::Surface#get_clip_rect
--- SDL::Surface#getClipRect

    サーフェスのクリッピング矩形を取得します。
    このサーフェスが blit の転送の場合は、
    クリッピング矩形の内部の領域のみが描画されます。

    [x, y, w, h]という整数4個の配列を返します。

    * See Also
      
      ((<SDL::Surface#set_clip_rect>)), ((<SDL.blit_surface>))

--- SDL.blit_surface(src,srcX,srcY,srcW,srcH,dst,dstX,dstY)
--- SDL.blitSurface(src,srcX,srcY,srcW,srcH,dst,dstX,dstY)

    転送元サーフェスから転送先サーフェスへ高速 blit 転送を行います
    ((|src|))が転送元、((|dst|))が転送先のサーフィスとなります。
    ((|srcX|))、((|srcY|))、((|srcW|))、((|srcH|))がすべて0の場合は((|src|))
    全体がコピーされます。
    
    blit 関数はロックされたサーフェス上で呼ばれるべきではありません。
    
    blit 操作の結果は
    SDL::SRCAPLHA がセットされているか否かによって
    大きく変化します。
    これがどのように結果に影響するかについては、
    Surface#set_alpha を見て下さい。
    以下の擬似コードのようにカラーキーとα属性もサーフェスの blit に作用します。
    
      if 転送元サーフェスに SDL::SRCALPHA がセットされている
        if 転送元サーフェスにαチャンネルがある (つまり Amask != 0)
          ピクセル単位のα値を使い、カラーキーを無視して blit
        elsif 転送元サーフェスに SDL::SRCCOLORKEY がセットされている
          カラーキーとサーフェス単位のα値を使って blit
        else
          サーフェス単位のα値を使って blit
        end
      elsif 転送元サーフェスに SDL::SRCCOLORKEY がセットされている
        カラーキーを使って blit
      else
        普通の矩形 blit
      end

    成功時には0を返します。
    どちらかのサーフェスがビデオメモリにあり、このメソッドが
    -2 を返す場合は、ビデオメモリが失われたため、
    画像込みでもう一度ロードして blit する必要があります。
    
    これは DirextX5.0 の下で、
    システムがあなたのフルスクリーンアプリケーションを切り換える時に発生します。
    あなたがビデオメモリに再度アクセスするまでは
    サーフェスのロックも失敗するでしょう。

--- SDL::Surface#fill_rect(x,y,w,h,color)
--- SDL::Surface#fillRect(x,y,w,h,color)

    与えられた矩形領域と ((|color|)) で
    高速な塗り潰しを行います。
    ((|color|))は((<色、ピクセルフォーマット、ピクセル値について>))に書かれて
    いる方法で指定できます。
    
    色の値がα値を含んでいる場合は、塗り潰し先は単にそのα情報で「塗り潰され」、
    ブレンディングは起こりません。
    塗り潰し先にクリッピング矩形がある場合(((<SDL::Surface#set_clip_rect>))に
    よってセットされます)は、この関数はクリッピング矩形と 指定した矩形が
    重なった領域でクリッピングされます。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * See Also
      
      ((<SDL::Surface#map_rgb>)), ((<SDL::Surface#map_rgba>)), ((<SDL.blit_surface>))

--- SDL::Surface#display_format
--- SDL::Surface#displayFormat

    このメソッドは((|self|))を表示サーフェス上への高速 blit に適するように、
    ビデオフレームバッファのピクセルフォーマットとパレットの
    新しいサーフェスを作ります。
    
    ハードウェアによるカラーキーやαの blit 転送のアクセラレーション
    の利点を得たい場合は、
    このメソッドを呼ぶ前にカラーキーとα値をセットしておくべきです。

    変換後のサーフェスを返します。

    変換に失敗するか、メモリを使い切った時は例外((<SDL::Error>))を返します。

    * See Also
      
      ((<SDL::Surface#display_format_alpha>)), ((<SDL::Surface#set_alpha>)), ((<SDL::Surface#set_color_key>))

--- SDL::Surface#display_format_alpha
--- SDL::Surface#displaFormatAlpha

    このメソッドは((|self|))を表示サーフェス上への高速 blit に適するように、
    ビデオフレームバッファのピクセルフォーマット・色にαチャンネルを加えた
    新しいサーフェスにコピーします。
    
    ハードウェアによるカラーキーやαの blit 転送のアクセラレーション
    の利点を得たい場合は、
    このメソッドを呼ぶ前にカラーキーとα値をセットしておくべきです。
    
    ((|self|))に SDL::SRCCOLORKEY フラグがセットされている
    場合は、この関数はカラーキーをαチャンネルに変換することに使うことが
    できます。
    そうして生成されたサーフェスは、
    カラーキーに一致するピクセルでは透明(α=0)に、
    他の場所では不透明(α=255)になります。

    変換後のサーフェスを返します。

    変換に失敗するか、メモリを使い切った時は例外((<SDL::Error>))を返します。

    * See Also
      
      ((<SDL::Surface#display_format>)), ((<SDL::Surface#set_alpha>)), ((<SDL::Surface#set_color_key>))

--- SDL::Surface#flags

    サーフェスにセットされているフラグを返します。以下のフラグが
    サポートされています。
    
    :SDL::SWSURFACE
      サーフェスがシステムメモリに格納されます。
    :SDL::HWSURFACE
      サーフェスがビデオメモリに格納されます。
    :SDL::ASYNCBLIT
      可能であればサーフェスは非同期 blit 転送を使用します。
    :SDL::ANYFORMAT
      任意のピクセルフォーマットを許可します。(表示サーフェス)
    :SDL::HWPALETTE
      サーフェスには排他的なパレットがあります。
    :SDL::DOUBLEBUF
      サーフェスはダブルバッファです。(表示サーフェス)
    :SDL::FULLSCREEN
      サーフェスはフルスクリーンです。(表示サーフェス)
    :SDL::OPENGL
      サーフェスには OpenGL コンテキストがあります。(表示サーフェス)
    :SDL::OPENGLBLIT
      サーフェスは OpenGL への blit 転送をサポートします。(表示サーフェス)
    :SDL::RESIZABLE
      サーフェスはサイズ変更が可能です。(表示サーフェス)
    :SDL::HWACCEL
      サーフェスの blit 転送にはハードウェアアクセラレーションを使います。
    :SDL::SRCCOLORKEY
      サーフェスはカラーキー付き blit 転送を使います。
    :SDL::RLEACCEL
      カラーキー付き blit 転送は RLE (ランレングス圧縮)による
      アクセラレーションが利きます。
    :SDL::SRCALPHA
      サーフェスの blit 転送はαブレンディングを使います。

    以上のフラグの OR を取ったものが返されます。

    * See Also
      
      ((<SDL::Surface>)), ((<SDL::Screen>))

--- SDL::Surface#w

    サーフェスの幅のピクセル数を整数で返します。

    * See Also
      
      ((<SDL::Surface#h>))

--- SDL::Surface#h

    サーフェスの高さのピクセル数を整数で返します。

    * See Also
      
      ((<SDL::Surface#w>))

--- SDL::Surface#pixels

    実際のピクセルデータをStringのインスタンスで返します。
    ピクセルデータの形式は((<SDL::Surface#flags>))、SDL::Surface#[RGBA]mask、
    ((<SDL::Surface#bpp>))によります。

    * NOTES

      これにアクセスするには((<ロック|SDL::Surface#lock>))が必要です。

    * See Also
      
      ((<SDL::Surface#flags>)), ((<SDL::Surface#Rmask>)), ((<SDL::Surface#Gmask>)), ((<SDL::Surface#Bmask>)), ((<SDL::Surface#Amask>)), ((<SDL::Surface#bpp>))

--- SDL::Surface#Rmask

    赤チャンネルの値を取得するのに使われるビットマスクを整数で返します。

--- SDL::Surface#Gmask

    緑チャンネルの値を取得するのに使われるビットマスクを整数で返します。

--- SDL::Surface#Bmask

    青チャンネルの値を取得するのに使われるビットマスクを整数で返します。

--- SDL::Surface#Amask

    αチャンネルの値を取得するのに使われるビットマスクを整数で返します。

--- SDL::Surface#colorkey

    透明ピクセルのピクセル値を正の整数で返します。

    * See Also
      
      ((<SDL::Surface>)), ((<SDL::Surface#set_color_key>)), ((<色、ピクセルフォーマット、ピクセル値について>))

--- SDL::Surface#alpha

    サーフェス全体のα値を0から255までの整数で返します。
    0が透明で、255が不透明です。

    * See Also
      
      ((<SDL::Surface#set_alpha>))

--- SDL::Surface#bpp

    サーフェスの各ピクセルを表わすのに使われるビット数を返します。
    通常8、16、24、32のいずれかです。

--- SDL::Surface.load(filename)

    画像のファイルをサーフェスにロードします。
    もし画像の形式が透明ピクセルをサポートしているならば、サーフェスに
    カラーキーがセットされます。
    
    対応しているフォーマットはBMP, PNM (PPM/PGM/PBM), XPM,
    XCF, PCX, GIF, JPEG, TIFF, TGA, PNG, LBMです。

    失敗したときには例外((<SDL::Error>))を発生させます。


    このメソッドを使うには SDL_image が必要です。
    * NOTES

      SDL_image のコンパイル時に使えるように指定しなかったフォーマット
      のファイルはこのメソッドではロードできません。

--- SDL::Surface.load_from_io(io)
--- SDL::Surface.loadFromIO(io)

    RubyのIOオブジェクトから画像データをサーフェスにロードします。
    もし画像の形式が透明ピクセルをサポートしているならば、サーフェスに
    カラーキーがセットされます。
    
    対応しているフォーマットはBMP, PNM (PPM/PGM/PBM), XPM,
    XCF, PCX, GIF, JPEG, TIFF, TGA, PNG, LBMです。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * NOTES

      RubyのIOオブジェクトとは、read、rewind、tell という3つのメソッドを
      持つオブジェクトです。IO、StringIO、Zlib::GzipReaderなどが
      利用できます。

    * See Also
      
      ((<SDL::Surface.load>)), ((<SDL::Surface.load_bmp_from_io>))

--- SDL::Surface#put_pixel(x, y, color)
--- SDL::Surface#putPixel(x, y, color)
--- SDL::Surface#[]=(x, y, color)

    サーフェスの(((|x|)), ((|y|)))で指定した位置に((|color|))のピクセルを描画します。
    ((|color|))としてピクセル値もしくは色を表わす配列が利用できます。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。
    * See Also
      
      ((<SDL::Surface#get_pixel>))

--- SDL::Surface#get_pixel(x, y)
--- SDL::Surface#getPixel(x, y)
--- SDL::Surface#[](x, y)

    サーフェスの(((|x|)), ((|y|)))で指定した位置のピクセル値を得ます。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。
    * See Also
      
      ((<SDL::Surface#put_pixel>))

--- SDL::Surface#put(src, x, y)

    ((|self|))の(((|x|)), ((|y|)))で指定した位置にサーフェス ((|src|)) を高速 blit 転送
    します。
    
    これは、
      SDL.blit_surface(src, 0, 0, src.w, src.h, self, x, y)
    と同じです。

    * See Also
      
      ((<SDL.blit_surface>))

--- SDL::Surface#copy_rect(x,y,w,h)
--- SDL::Surface#copyRect(x,y,w,h)

    サーフェス ((|self|)) の (((|x|)), ((|y|)), ((|w|)), ((|h|))) で指定される矩形を
    コピーした新しいサーフェスを作り、返します。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * NOTES

      このメソッドは内部で ((<SDL.blit_surface>)) を呼ぶため、ロックされたサーフェス上で
      呼ばれるべきではありません。

--- SDL.auto_lock?
--- SDL.autoLock?
--- SDL.auto_lock
--- SDL.autoLock

    サーフェスに対する((<ロック|SDL::Surface#lock>))が必要な操作をするとき、
    Ruby/SDLが自動的にロック/アンロックするか
    どうかを true/false で返します。デフォルトでは true です。


    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#lock>)), ((<SDL::Surface#unlock>)), ((<SDL.auto_lock_on>)), ((<SDL.auto_lock_off>))

--- SDL.auto_lock_on
--- SDL.autoLockON

    自動ロックを利用するようにします。これを呼ぶと((<SDL.auto_lock?>))が真に
    なります。


    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#lock>)), ((<SDL.auto_lock?>)), ((<SDL.auto_lock_off>))

--- SDL.auto_lock_off
--- SDL.autoLockOFF

    自動ロックを利用しないようにします。これを呼ぶと((<SDL.auto_lock?>))が偽に
    なります。


    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#lock>)), ((<SDL.auto_lock?>)), ((<SDL.auto_lock_on>))

--- SDL.auto_lock=(locking)
--- SDL.autoLock=(locking)

    自動ロックを使うかどうかを設定します。 SDL.auto_lock = true は
    SDL.auto_lock_on と同じで、 SDL.auto_lock = false は SDL.auto_lock_off と
    同じです。


    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#lock>)), ((<SDL.auto_lock?>)), ((<SDL.auto_lock_on>)), ((<SDL.auto_lock_off>))

--- SDL.transform(src,dst,angle,xscale,yscale,px,py,qx,qy,flags)

    ((|src|))を回転縮小拡大したものを((|dst|))に描画します。
    ((|angle|))は回転角度(単位はラジアンではなく度)、((|xscale|))、((|yscale|))は
    それぞれX方向とY方向の倍率、(((|px|)), ((|py|))) は ((|src|))における回転の
    中心で、その点が((|dst|))の(((|qx|)), ((|qy|)))にくるように描画されます。
    また、((|flags|))としては以下の値のORを取ったものを与えます。
    
    :0
      普通
    :SDL::TRANSFORM_SAFE
      ((|src|)) と ((|dst|)) のピクセルフォーマットが異なっていても正しく描画します。
      ((|src|)).bpp と ((|dst|)).bpp が異なる場合は自動的に有効になります。
      ただしれを有効にすると遅くなります。
    :SDL::TRANSFORM_AA
      補完描画をします。遅いがみためが良くなります。
    :SDL::TRANSFORM_TMAP
      テクスチャマッピングを使います。すこし速くなるが見た目は悪くなります。
      このフラグを有効にした場合 ((|px|)) 、((|py|)) や上で挙げたフラグを無視します。


    このメソッドを使うには SGE が必要です。
    * NOTES

      最適なパフォーマンスを得るために、((|src|)) と ((|dst|)) は同じピクセル
      フォーマットを使い、また24bpp以外のフォーマットを使ってください。
      
      ((<SDL::Surface#set_clip_rect>)) で設定したクリッピング矩形は ((|src|))
      および ((|dst|)) で有効です。
      
      SDL::TRANSFORM_AA を使う場合は、高さ方向および幅方向にそれぞれ
      1ピクセルづつ間引かれます(パフォーマンスを良くするためです)。
      
      ((|src|))が32bpp RGBA フォーマットの場合には、SDL::TRANSFORM_SAFEを使うべきです。
      
      このメソッドはアルファブレンディングは一切しませんが、アルファチャンネルの
      値は保ちます。もし、アルファブレンディング、カラーキーの効果のある
      回転縮小拡大描画をしたい場合は((<SDL.transform_blit>))をかわりに利用してください。

    * See Also
      
      ((<SDL.transform_blit>)), ((<SDL::Surface#transform_surface>)), ((<SDL::Surface.new>))

--- SDL.transform_blit(src,dst,angle,xscale,yscale,px,py,qx,qy,flags)
--- SDL.transformBlit(src,dst,angle,xscale,yscale,px,py,qx,qy,flags)

    回転縮小拡大描画をします。引数の意味などは ((<SDL.transform>)) と同様です。
    ((<SDL.transform>)) との違いは ((|src|)) に設定されたカラーキー(抜き色)
    およびアルファブレンディングが有効になることです。


    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL.transform>)), ((<SDL::Surface#transform_surface>)), ((<SDL::Surface#set_color_key>)), ((<SDL::Surface#set_alpha>))

--- SDL::Surface#draw_line(x1,x2,y1,y2,color)
--- SDL::Surface#drawLine(x1,x2,y1,y2,color)

    (((|x1|)), ((|y1|)))から(((|x2|)), ((|y2|)))までの直線を ((|color|)) で指定した色で
    描画します。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_aa_line>)), ((<SDL::Surface#draw_line_alpha>)), ((<SDL::Surface#draw_rect>))

--- SDL::Surface#draw_aa_line(x1,x2,y1,y2,color)
--- SDL::Surface#drawAALine(x1,x2,y1,y2,color)

    (((|x1|)), ((|y1|)))から(((|x2|)), ((|y2|)))までの直線を ((|color|)) で指定した色で
    アンチエイリアスして描画します。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_line>))

--- SDL::Surface#draw_line_alpha(x1,x2,y1,y2,color,alpha)
--- SDL::Surface#drawLineAlpha(x1,x2,y1,y2,color,alpha)

    (((|x1|)), ((|y1|)))から(((|x2|)), ((|y2|)))までの直線を ((|color|)) で指定した色、
    ((|alpha|))で指定したα値で描画します。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_line>))

--- SDL::Surface#draw_aa_line_alpha(x1,x2,y1,y2,color,alpha)
--- SDL::Surface#drawAALineAlpha(x1,x2,y1,y2,color,alpha)

    (((|x1|)), ((|y1|)))から(((|x2|)), ((|y2|)))までの直線を ((|color|)) で指定した色、
    ((|alpha|))で指定したα値でアンチエイリアスをかけて描画します。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_line>))

--- SDL::Surface#draw_rect(x,y,w,h,color)
--- SDL::Surface#drawRect(x,y,w,h,color)

    (((|x|)), ((|y|)))が左上の点で((|w|))が幅、((|h|))が高さの長方形を ((|color|)) で
    指定した色で描画します。中を塗り潰しません。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#fill_rect>))

--- SDL::Surface#draw_rect_alpha(x,y,w,h,color,alpha)
--- SDL::Surface#drawRectAlpha(x,y,w,h,color,alpha)

    (((|x|)), ((|y|)))が左上の点で((|w|))が幅、((|h|))が高さの長方形を ((|color|)) で
    指定した色、((|alpha|)) で指定したα値で描画します。中を塗り潰しません。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#fill_rect>)), ((<SDL::Surface#draw_rect>))

--- SDL::Surface#draw_filled_rect_alpha(x,y,w,h,color,alpha)
--- SDL::Surface#drawFilledRectAlpha(x,y,w,h,color,alpha)

    (((|x|)), ((|y|)))が左上の点で((|w|))が幅、((|h|))が高さの中を塗り潰した
    長方形を ((|color|)) で指定した色、((|alpha|)) で指定したα値で描画します。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#fill_rect>)), ((<SDL::Surface#draw_rect>))

--- SDL::Surface#draw_circle(x,y,r,color)
--- SDL::Surface#drawCircle(x,y,r,color)

    中心 (((|x|)),((|y|)))、半径 ((|r|))の円を ((|color|)) で指定した色で描画します。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_ellipse>)), ((<SDL::Surface#draw_filled_circle>)), ((<SDL::Surface#draw_aa_circle>)), ((<SDL::Surface#draw_aa_filled_circle>)), ((<SDL::Surface#draw_circle_alpha>)), ((<SDL::Surface#draw_filled_circle_alpha>)), ((<SDL::Surface#draw_aa_circle_alpha>))

--- SDL::Surface#draw_filled_circle(x,y,r,color)
--- SDL::Surface#drawFilledCircle(x,y,r,color)

    中心 (((|x|)),((|y|)))、半径 ((|r|))の円を ((|color|)) で指定した色で中を
    塗り潰して描画します。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_circle>))

--- SDL::Surface#draw_aa_circle(x,y,r,color)
--- SDL::Surface#drawAACircle(x,y,r,color)

    中心 (((|x|)),((|y|)))、半径 ((|r|))の円を ((|color|)) で指定した色で
    アンチエイリアスをかけて描画します。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_circle>))

--- SDL::Surface#draw_aa_filled_circle(x,y,r,color)
--- SDL::Surface#drawAAFilledCircle(x,y,r,color)

    中心 (((|x|)),((|y|)))、半径 ((|r|))の円を ((|color|)) で指定した色で
    中を塗り潰しアンチエイリアスをかけて描画します。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_circle>))

--- SDL::Surface#draw_circle_alpha(x,y,r,color,alpha)
--- SDL::Surface#drawCircleAlpha(x,y,r,color,alpha)

    中心 (((|x|)),((|y|)))、半径 ((|r|))の円を ((|color|)) で指定した色、
    ((|alpha|))で指定したアルファ値で描画します。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_circle>))

--- SDL::Surface#draw_filled_circle_alpha(x,y,r,color,alpha)
--- SDL::Surface#drawFilledCircleAlpha(x,y,r,color,alpha)

    中心 (((|x|)),((|y|)))、半径 ((|r|))の中を塗り潰した円を ((|color|)) で指定した色、
    ((|alpha|))で指定したアルファ値で描画します。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_circle>))

--- SDL::Surface#draw_aa_circle_alpha(x,y,r,color,alpha)
--- SDL::Surface#drawAACircleAlpha(x,y,r,color,alpha)

    中心 (((|x|)),((|y|)))、半径 ((|r|))の円を ((|color|)) で指定した色、
    ((|alpha|))で指定したアルファ値でアンチエイリアスで描画します。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_circle>))

--- SDL::Surface#draw_ellipse(x,y,rx,ry,color)
--- SDL::Surface#drawEllipse(x,y,rx,ry,color)

    中心 (((|x|)),((|y|)))、X方向の半径 ((|xr|))、Y方向の半径 ((|ry|)) の楕円を ((|color|)) で指定した色で描画します。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_circle>)), ((<SDL::Surface#draw_filled_ellipse>)), ((<SDL::Surface#draw_aa_ellipse>)), ((<SDL::Surface#draw_aa_filled_ellipse>)), ((<SDL::Surface#draw_ellipse_alpha>)), ((<SDL::Surface#draw_filled_ellipse_alpha>)), ((<SDL::Surface#draw_aa_ellipse_alpha>))

--- SDL::Surface#draw_filled_ellipse(x,y,rx,ry,color)
--- SDL::Surface#drawFilledEllipse(x,y,rx,ry,color)

    中心 (((|x|)),((|y|)))、X方向の半径 ((|xr|))、Y方向の半径 ((|ry|)) の楕円を ((|color|)) で指定した色で中を
    塗り潰して描画します。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_ellipse>))

--- SDL::Surface#draw_aa_ellipse(x,y,rx,ry,color)
--- SDL::Surface#drawAAEllipse(x,y,rx,ry,color)

    中心 (((|x|)),((|y|)))、X方向の半径 ((|xr|))、Y方向の半径 ((|ry|)) の楕円を ((|color|)) で指定した色で
    アンチエイリアスをかけて描画します。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_ellipse>))

--- SDL::Surface#draw_aa_filled_ellipse(x,y,rx,ry,color)
--- SDL::Surface#drawAAFilledEllipse(x,y,rx,ry,color)

    中心 (((|x|)),((|y|)))、X方向の半径 ((|xr|))、Y方向の半径 ((|ry|)) の楕円を ((|color|)) で指定した色で
    中を塗り潰しアンチエイリアスをかけて描画します。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_ellipse>))

--- SDL::Surface#draw_ellipse_alpha(x,y,rx,ry,color,alpha)
--- SDL::Surface#drawEllipseAlpha(x,y,rx,ry,color,alpha)

    中心 (((|x|)),((|y|)))、X方向の半径 ((|xr|))、Y方向の半径 ((|ry|)) の楕円を ((|color|)) で指定した色、
    ((|alpha|))で指定したアルファ値で描画します。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_ellipse>))

--- SDL::Surface#draw_filled_ellipse_alpha(x,y,rx,ry,color,alpha)
--- SDL::Surface#drawFilledEllipseAlpha(x,y,rx,ry,color,alpha)

    中心 (((|x|)),((|y|)))、X方向の半径 ((|xr|))、Y方向の半径 ((|ry|)) の中を塗り潰した楕円を ((|color|)) で指定した色、
    ((|alpha|))で指定したアルファ値で描画します。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_ellipse>))

--- SDL::Surface#draw_aa_ellipse_alpha(x,y,rx,ry,color,alpha)
--- SDL::Surface#drawAAEllipseAlpha(x,y,rx,ry,color,alpha)

    中心 (((|x|)),((|y|)))、X方向の半径 ((|xr|))、Y方向の半径 ((|ry|)) の楕円を ((|color|)) で指定した色、
    ((|alpha|))で指定したアルファ値でアンチエイリアスで描画します。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_ellipse>))

--- SDL::Surface#draw_bezier(x1,y1,x2,y2,x3,y3,x4,y4,level,color)
--- SDL::Surface#drawBezier(x1,y1,x2,y2,x3,y3,x4,y4,level,color)

    (((|x1|)), ((|y1|))) から (((|x4|)), ((|y4|)))までのベジエ曲線を
    (((|x2|)), ((|y2|))) と (((|x3|)), ((|y3|))) をコントロールポイントとして
    ((|color|))で指定した色で
    描画する。((|leve|)) は曲線の近似度で、4から7を使うと良い。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_aa_bezier>)), ((<SDL::Surface#draw_bezier_alpha>)), ((<SDL::Surface#draw_aa_bezier_alpha>))

--- SDL::Surface#draw_aa_bezier(x1,y1,x2,y2,x3,y3,x4,y4,level,color)
--- SDL::Surface#drawAABezier(x1,y1,x2,y2,x3,y3,x4,y4,level,color)

    (((|x1|)), ((|y1|))) から (((|x4|)), ((|y4|)))までのベジエ曲線を
    (((|x2|)), ((|y2|))) と (((|x3|)), ((|y3|))) をコントロールポイントとして
    ((|color|))で指定した色でアンチエイリアスして
    描画する。((|leve|)) は曲線の近似度で、4から7を使うと良い。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_bezier>))

--- SDL::Surface#draw_bezier_alpha(x1,y1,x2,y2,x3,y3,x4,y4,level,color,alpha)
--- SDL::Surface#drawBezierAlpha(x1,y1,x2,y2,x3,y3,x4,y4,level,color,alpha)

    (((|x1|)), ((|y1|))) から (((|x4|)), ((|y4|)))までのベジエ曲線を
    (((|x2|)), ((|y2|))) と (((|x3|)), ((|y3|))) をコントロールポイントとして
    ((|color|))で指定した色、((|alpha|))で指定したα値で
    描画する。((|leve|)) は曲線の近似度で、4から7を使うと良い。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_bezier>))

--- SDL::Surface#draw_aa_bezier_alpha(x1,y1,x2,y2,x3,y3,x4,y4,level,color,alpha)
--- SDL::Surface#drawAABezierAlpha(x1,y1,x2,y2,x3,y3,x4,y4,level,color,alpha)

    (((|x1|)), ((|y1|))) から (((|x4|)), ((|y4|)))までのベジエ曲線を
    (((|x2|)), ((|y2|))) と (((|x3|)), ((|y3|))) をコントロールポイントとして
    ((|color|))で指定した色、((|alpha|))で指定したα値でアンチエイリアス
    描画する。((|leve|)) は曲線の近似度で、4から7を使うと良い。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。

    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#draw_bezier>))

--- SDL::Surface#transform_surface(bgcolor,angle,xscale,yscale,flags)
--- SDL::Surface#transformSurface(bgcolor,angle,xscale,yscale,flags)

    ((|self|)) を拡大縮小変形したサーフェスを生成し返す。
    回転によって生じた隙間は ((|bgcolor|)) で指定した色で埋められる。
    引数 ((|angle|))、((|xscale|))、((|yscale|))、((|flags|)) は ((<SDL.transform>))
    と同じ意味である。
    
    新しいサーフェスは ((|self|)) と同じ bpp およびピクセルフォーマットを
    持つ。


    このメソッドを使うにはサーフェスを((<ロック|SDL::Surface#lock>))する必要があります。
    ((<SDL.auto_lock?>))が真の場合はシステムが自動的にロック/アンロックします。
    失敗したときには例外((<SDL::Error>))を発生させます。


    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL.transform>)), ((<SDL.transform_blit>))

= Window Management
* ((<Window Management概要>))
* ((<Window Management関連メソッド>))
  * ((<SDL::WM.caption>)) -- ウィンドウのタイトルとアイコン名を取得します。
  * ((<SDL::WM.set_caption>)) -- ウィンドウのタイトルとアイコン名をセットします。
  * ((<SDL::WM.icon=>)) -- 表示ウィンドウにアイコンをセットします。
  * ((<SDL::WM.iconify>)) -- ウィンドウをアイコン化/最小化します。
  * ((<SDL::WM.grab_input>)) -- マウスとキーボード入力をつかんで離さないようにします。

== Window Management概要
SDL はウィンドウ管理の機能の一部を提供しており、
アプリケーションが自身のタイトルを変更したり、
フルスクリーンモードがサポートされていれば
ウィンドウモードとフルスクリーンモードとを切り換える
ことができます。

== Window Management関連メソッド

--- SDL::WM.caption

    ウィンドウのタイトルとアイコン名を文字列2個の配列で返します。

    * See Also
      
      ((<SDL::WM.set_caption>))

--- SDL::WM.set_caption(title, icon)
--- SDL::WM.setCaption(title, icon)

    表示ウィンドウのタイトルバーとアイコン名をセットします。

    * See Also
      
      ((<SDL::WM.caption>)), ((<SDL::WM.icon=>))

--- SDL::WM.icon=(icon_image)

    表示ウィンドウにアイコンをセットします。
    Win32 のアイコンは 32×32 でなければいけません。
    
    このモジュール関数は、((<SDL.set_video_mode>)) を
    初めて呼ぶ前に呼ばれなければいけません。
    ((|icon|))としては ((<SDL::Surface>)) のインスタンスを与えます。


    EXAMPLE
      SDL::WM.icon = SDL::Surface.load_bmp("icon.bmp")

    * See Also
      
      ((<SDL.set_video_mode>)), ((<SDL::WM.caption>))

--- SDL::WM.iconify

    ウィンドウを管理する環境でアプリケーションが実行されている場合、
    SDL はアプリケーションをアイコン化/最小化することを試みます。
    もし成功すれば、アプリケーションは ((<SDL::Event2::APPACTIVE>)) を失なった
    イベントを受け取るでしょう。

    失敗したときには例外((<SDL::Error>))を発生させます。

--- SDL::WM.grab_input(mode)
--- SDL::WM.grabInput(mode)

    つかむ(Grabbing)とは、マウスがアプリケーションウィンドウに閉じ込められ、
    ほぼ全てのキーボード入力が直接アプリケーションに転送され、
    ウィンドウマネージャにも解釈されないことを表します。
    
    ((|mode|)) として以下の定数を与えることができます。
    * SDL::WM::GRAB_QUERY
    * SDL::WM::GRAB_OFF
    * SDL::WM::GRAB_ON
    
    ((|mode|)) が SDL::WM::GRAB_QUERY のときは、
    grab モードは変更されないで現在の grab モードが返されます。

    現在の、あるいは新しいモードを返します。

= Event
* ((<Event system概要>))
* ((<SDL::Event2>))
* ((<SDL::Event2::Active>))
* ((<SDL::Event2::KeyDown>))
* ((<SDL::Event2::KeyUp>))
* ((<SDL::Event2::MouseMotion>))
* ((<SDL::Event2::MouseButtonDown>))
* ((<SDL::Event2::MouseButtonUp>))
* ((<SDL::Event2::JoyAxis>))
* ((<SDL::Event2::JoyBall>))
* ((<SDL::Event2::JoyHat>))
* ((<SDL::Event2::JoyButtonDown>))
* ((<SDL::Event2::JoyButtonUp>))
* ((<SDL::Event2::Quit>))
* ((<SDL::Event2::SysWM>))
* ((<SDL::Event2::VideoResize>))
* ((<SDL::Event2::VideoExpose>))
* ((<SDL::Key>))
* ((<SDL::Mouse>))
* Event関連メソッド
  * ((<SDL::Event2.poll>)) -- 現在留まっているイベントを取り出します。
  * ((<SDL::Event2.wait>)) -- 次の利用可能なイベントが来るまで無限に待機します。
  * ((<SDL::Event2.push>)) -- イベントをイベントキューにプッシュします。
  * ((<SDL::Event2.app_state>)) -- アプリケーションの状態を得ます。
  * ((<SDL::Event2.enable_unicode>)) -- UNICODE変換を有効にします。
  * ((<SDL::Event2.disable_unicode>)) -- UNICODE変換を無効にします。
  * ((<SDL::Event2.enable_unicode?>)) -- UNICODE変換が有効かどうか調べます。
  * ((<SDL::Event2::Active#gain>)) -- 可視性を得たなら true を、失ったなら false を返します。
  * ((<SDL::Event2::Active#state>)) -- どのような種類の可視性変更イベントが発生したのかを返します。
  * ((<SDL::Event2::KeyDown#press>)) -- trueを返します。
  * ((<SDL::Event2::KeyDown#sym>)) -- 何のキーを押したかをキーシンボルで返します。
  * ((<SDL::Event2::KeyDown#mod>)) -- キー押下時のキーモディファイアの状態を返します。
  * ((<SDL::Event2::KeyDown#unicode>)) -- 変換された文字を返します。
  * ((<SDL::Event2::KeyUp#press>)) -- falseを返します。
  * ((<SDL::Event2::KeyUp#sym>)) -- 何のキーを離したかをキーシンボルで返します。
  * ((<SDL::Event2::KeyUp#mod>)) -- キーモディファイアの状態を返します。
  * ((<SDL::Event2::MouseMotion#state>)) -- 現在のボタンの状態を返します。
  * ((<SDL::Event2::MouseMotion#x>)) -- マウスの X 座標を返します。
  * ((<SDL::Event2::MouseMotion#y>)) -- マウスの Y 座標を返します。
  * ((<SDL::Event2::MouseMotion#xrel>)) -- マウスの X 方向の相対的な動きを返します。
  * ((<SDL::Event2::MouseMotion#yrel>)) -- マウスの Y 方向の相対的な動きを返します。
  * ((<SDL::Event2::MouseButtonDown#button>)) -- 押されたボタンの番号を返します。
  * ((<SDL::Event2::MouseButtonDown#press>)) -- ボタン押し下げイベントかどうかを返します。
  * ((<SDL::Event2::MouseButtonDown#x>)) -- マウスの X 座標を返します。
  * ((<SDL::Event2::MouseButtonDown#y>)) -- マウスの Y 座標を返します。
  * ((<SDL::Event2::MouseButtonUp#button>)) -- 離されたボタンの番号を返します。
  * ((<SDL::Event2::MouseButtonUp#press>)) -- ボタン押し下げイベントかどうかを返します。
  * ((<SDL::Event2::MouseButtonUp#x>)) -- マウスの X 座標を返します。
  * ((<SDL::Event2::MouseButtonUp#y>)) -- マウスの Y 座標を返します。
  * ((<SDL::Event2::JoyAxis#which>)) -- ジョイスティックデバイスの番号を返します。
  * ((<SDL::Event2::JoyAxis#axis>)) -- ジョイスティックの軸の番号を返します。
  * ((<SDL::Event2::JoyAxis#value>)) -- 軸の値を返します。
  * ((<SDL::Event2::JoyBall#which>)) -- ジョイスティックデバイスの番号を返します。
  * ((<SDL::Event2::JoyBall#ball>)) -- ジョイスティックのトラックボールの番号を返します。
  * ((<SDL::Event2::JoyBall#xrel>)) -- X方向の相対的な動きを返します。
  * ((<SDL::Event2::JoyBall#yrel>)) -- Y方向の相対的な動きを返します。
  * ((<SDL::Event2::JoyHat#which>)) -- ジョイスティックデバイスの番号を返します。
  * ((<SDL::Event2::JoyHat#hat>)) -- ジョイスティックのハットスイッチの番号を返します。
  * ((<SDL::Event2::JoyHat#value>)) -- ハットスイッチの位置を返します。
  * ((<SDL::Event2::JoyButtonDown#which>)) -- ジョイスティックデバイスの番号を返します。
  * ((<SDL::Event2::JoyButtonDown#button>)) -- ジョイスティックのボタンの番号を返します。
  * ((<SDL::Event2::JoyButtonDown#press>)) -- ボタン押し下げイベントかどうかを返します。
  * ((<SDL::Event2::JoyButtonUpwhich>)) -- ジョイスティックデバイスの番号を返します。
  * ((<SDL::Event2::JoyButtonUp#button>)) -- ジョイスティックのボタンの番号を返します。
  * ((<SDL::Event2::JoyButtonUp#press>)) -- ボタン押し下げイベントかどうかを返します。
  * ((<SDL::Event2::VideoResize#w>)) -- ウィンドウの新しい幅を返します。
  * ((<SDL::Event2::VideoResize#h>)) -- ウィンドウの新しい高さを返します。
  * ((<SDL::Key.scan>)) -- キーボードの状態のスナップショットをとります。
  * ((<SDL::Key.press?>)) -- キーボードを押しているかどうかを返します。
  * ((<SDL::Key.mod_state>)) -- モディファイアキーの状態を得ます。
  * ((<SDL::Key.get_key_name>)) -- キーシンボルに対応する名前を得ます。
  * ((<SDL::Key.enable_key_repeat>)) -- キーリピートレートを設定します。
  * ((<SDL::Key.disable_key_repeat>)) -- キーリピートを無効にします。
  * ((<SDL::Mouse.state>)) -- 現在のマウスの状態を得ます。
  * ((<SDL::Mouse.warp>)) -- マウスカーソルの位置をセットします。
  * ((<SDL::Mouse.show>)) -- カーソルが画面に表示されるようにします。
  * ((<SDL::Mouse.hide>)) -- カーソルが画面に表示されないようにします。
  * ((<SDL::Mouse.show?>)) -- カーソルが画面に表示されているかどうかを返します。
  * ((<SDL::Mouse.set_cursor>)) -- 現在アクティブなマウスカーソルを設定します。

== Event system概要
イベント処理によってあなたのアプリケーションはユーザーからの
入力を受け取ることができます。
イベント処理は次のメソッドを呼ぶことで、(ビデオと一緒に)初期化されます。
  SDL.init(SDL::INIT_VIDEO)
内部的には、SDL は処理されるまで待機している全てのイベントをイベントキューに
格納します。

((<SDL::Event2.poll>)) や ((<SDL::Event2.wait>)) のようなメソッドを使うことで、
待機している入力イベントを見たり、処理することができます。

Ruby/SDLにおけるイベント処理の鍵は、((<SDL::Event2>))のサブクラス群です。
イベントキュー自身は((<SDL::Event2>))(のサブクラス)のインスタンスの列と
みなすことができます。それらのオブジェクトは((<SDL::Event2.poll>))を使って
キューから読みだされ、
そしてそこに格納された情報の処理をアプリケーションがします。

((<SDL::Event2>))のサブクラスは以下の通りです。
* ((<SDL::Event2::Active>))
* ((<SDL::Event2::KeyDown>))
* ((<SDL::Event2::KeyUp>))
* ((<SDL::Event2::MouseMotion>))
* ((<SDL::Event2::MouseButtonDown>))
* ((<SDL::Event2::MouseButtonUp>))
* ((<SDL::Event2::JoyAxis>))
* ((<SDL::Event2::JoyBall>))
* ((<SDL::Event2::JoyHat>))
* ((<SDL::Event2::JoyButtonDown>))
* ((<SDL::Event2::JoyButtonUp>))
* ((<SDL::Event2::Quit>))
* ((<SDL::Event2::SysWM>))
* ((<SDL::Event2::VideoResize>))
* ((<SDL::Event2::VideoExpose>))

イベントクラスには以下の二つの用途があります。
* キューからイベントを読み出す
* キューにイベントを登録する

キューからイベントを読み出すには、 ((<SDL::Event2.poll>)) を使います。
ここでは、 ((<SDL::Event2.poll>)) を使った例を示します。
  while event = SDL::Event2.poll
((<SDL::Event2.poll>)) はイベントキューから次のイベントを
取り出して、キューから削除します。キューにイベントがないときは
nil を返し、それ以外の場合は上に挙げたイベントクラスのインスタンス
を返します。

次に、イベントの種類を判別するために case〜when 文を使います。
    case event
次に、どの種類のイベントを知りたいのかということと、起こった
イベントの種類を知らなければいけません。
ここでは、アプリケーション内のマウスポインタの動きを知りたいとします。
求めているイベントに対応するクラスは((<SDL::Event2::MouseMotion>))
であることがわかります。case〜when 文の when の所にクラスを書くと、
そのクラスのインスタンスをcaseに与えたときに分岐することうぃ利用します
  when SDL::Event2::MouseMotion
ここでは event は ((<SDL::Event2::MouseMotion>)) のインスタンスなので
そのメソッドを使って情報を得ることができます。
      puts "マウスカーソルが移動するイベントを受信しました。"
      puts "カーソルの位置は(#{event.x}, #{event.y})です。"
    else
      puts "ハンドルしていないイベントです!"
    end
  end
  puts "イベントキューは空です。"

イベントキューにイベントを送ることもできますので、
イベントキューを双方向通信に利用することもできます。
((<SDL::Event2.push>))でイベントキューにイベントを送ることができます。
偽の入力イベントを作り出したりするために使うことができます。
ユーザイベントは Ruby/SDL では利用できません。

== SDL::Event2
イベントを取り扱うためのクラスです。実際のクラスはこのクラスのサブクラス
として表されます。

Event2という名前は互換性のためのものです。これが気にいらない場合は、
ライブラリ読み込みの直後に
  module SDL
    remove_const :Event2
    Event = Event2
  end
と書いてください。これで SDL::Event という名前で SDL::Event2 に
アクセスできます。

== SDL::Event2::Active
アプリケーションの可視性に関するイベントのクラスです。

マウスカーソルのウインドウの出入り、
キーボードフォーカスの得失、および
最小化/アイコン化されたり元に戻ったときに発生します。

上のいずれが生じたのかは ((<SDL::Event2::Active#state>)) でわかります。

* NOTES

  このイベントは、最初にウィンドウが作成されたときには発生しません。

* ((<SDL::Event2::Active#gain>)) -- 可視性を得たなら true を、失ったなら false を返します。
* ((<SDL::Event2::Active#state>)) -- どのような種類の可視性変更イベントが発生したのかを返します。

== SDL::Event2::KeyDown
キーボードを押したときに発生するイベントのクラスです。

* ((<SDL::Event2::KeyDown#press>)) -- trueを返します。
* ((<SDL::Event2::KeyDown#sym>)) -- 何のキーを押したかをキーシンボルで返します。
* ((<SDL::Event2::KeyDown#mod>)) -- キー押下時のキーモディファイアの状態を返します。
* ((<SDL::Event2::KeyDown#unicode>)) -- 変換された文字を返します。

== SDL::Event2::KeyUp
キーボードを離したときに発生するイベントのクラスです。

* ((<SDL::Event2::KeyUp#press>)) -- falseを返します。
* ((<SDL::Event2::KeyUp#sym>)) -- 何のキーを離したかをキーシンボルで返します。
* ((<SDL::Event2::KeyUp#mod>)) -- キーモディファイアの状態を返します。

== SDL::Event2::MouseMotion
マウスを動かしたときに発生するイベントのクラスです。

簡単に言うと、
このイベントは
アプリケーションウィンドウの中でユーザーがマウスを動かしたとき、
または ((<SDL::Mouse.warp>)) が呼ばれた時に発生します。
現在のボタンの状態(((<SDL::Event2::MouseMotion#state>)))とともに、
絶対座標(((<SDL::Event2::MouseMotion#x>)) と ((<SDL::Event2::MouseMotion#y>)))
と相対座標(((<SDL::Event2::MouseMotion#xrel>)) と ((<SDL::Event2::MouseMotion#yrel>)))
の両方が報告されます。

* ((<SDL::Event2::MouseMotion#state>)) -- 現在のボタンの状態を返します。
* ((<SDL::Event2::MouseMotion#x>)) -- マウスの X 座標を返します。
* ((<SDL::Event2::MouseMotion#y>)) -- マウスの Y 座標を返します。
* ((<SDL::Event2::MouseMotion#xrel>)) -- マウスの X 方向の相対的な動きを返します。
* ((<SDL::Event2::MouseMotion#yrel>)) -- マウスの Y 方向の相対的な動きを返します。

== SDL::Event2::MouseButtonDown
マウスボタンを押したときのイベントのクラスです。

* ((<SDL::Event2::MouseButtonDown#button>)) -- 押されたボタンの番号を返します。
* ((<SDL::Event2::MouseButtonDown#press>)) -- ボタン押し下げイベントかどうかを返します。
* ((<SDL::Event2::MouseButtonDown#x>)) -- マウスの X 座標を返します。
* ((<SDL::Event2::MouseButtonDown#y>)) -- マウスの Y 座標を返します。

== SDL::Event2::MouseButtonUp
マウスボタンを離したときのイベントのクラスです。

* ((<SDL::Event2::MouseButtonUp#button>)) -- 離されたボタンの番号を返します。
* ((<SDL::Event2::MouseButtonUp#press>)) -- ボタン押し下げイベントかどうかを返します。
* ((<SDL::Event2::MouseButtonUp#x>)) -- マウスの X 座標を返します。
* ((<SDL::Event2::MouseButtonUp#y>)) -- マウスの Y 座標を返します。

== SDL::Event2::JoyAxis
ジョイスティックの軸イベントのクラスです。

ユーザがジョイスティックの軸を移動させるとこのイベントが発生します。

* ((<SDL::Event2::JoyAxis#which>)) -- ジョイスティックデバイスの番号を返します。
* ((<SDL::Event2::JoyAxis#axis>)) -- ジョイスティックの軸の番号を返します。
* ((<SDL::Event2::JoyAxis#value>)) -- 軸の値を返します。

* SEEALSO
    ((<SDL::Joystick#num_axes>))、((<SDL::Joystick#axis>))

== SDL::Event2::JoyBall
ジョイスティックのトラックボールの動きイベントのクラスです。

* ((<SDL::Event2::JoyBall#which>)) -- ジョイスティックデバイスの番号を返します。
* ((<SDL::Event2::JoyBall#ball>)) -- ジョイスティックのトラックボールの番号を返します。
* ((<SDL::Event2::JoyBall#xrel>)) -- X方向の相対的な動きを返します。
* ((<SDL::Event2::JoyBall#yrel>)) -- Y方向の相対的な動きを返します。

* SEEALSO

  ((<SDL::Joystick#num_balls>))、((<SDL::Joystick#ball>))

== SDL::Event2::JoyHat
ジョイスティックのハットスイッチの位置変化イベントのクラスです。

* ((<SDL::Event2::JoyHat#which>)) -- ジョイスティックデバイスの番号を返します。
* ((<SDL::Event2::JoyHat#hat>)) -- ジョイスティックのハットスイッチの番号を返します。
* ((<SDL::Event2::JoyHat#value>)) -- ハットスイッチの位置を返します。

* SEEALSO
  
  ((<SDL::Joystick#num_hats>))、((<SDL::Joystick#hat>))

== SDL::Event2::JoyButtonDown
ジョイスティックのボタンが押し下げられたときに発生するイベントのクラスです。

* ((<SDL::Event2::JoyButtonDown#which>)) -- ジョイスティックデバイスの番号を返します。
* ((<SDL::Event2::JoyButtonDown#button>)) -- ジョイスティックのボタンの番号を返します。
* ((<SDL::Event2::JoyButtonDown#press>)) -- ボタン押し下げイベントかどうかを返します。

* SEEALSO

  ((<SDL::Joystick#num_buttons>))、((<SDL::Joystick#button>))

== SDL::Event2::JoyButtonUp
ジョイスティックのボタンを離したときに発生するイベントのクラスです。

* ((<SDL::Event2::JoyButtonUpwhich>)) -- ジョイスティックデバイスの番号を返します。
* ((<SDL::Event2::JoyButtonUp#button>)) -- ジョイスティックのボタンの番号を返します。
* ((<SDL::Event2::JoyButtonUp#press>)) -- ボタン押し下げイベントかどうかを返します。

* SEEALSO

  ((<SDL::Joystick#num_buttons>))、((<SDL::Joystick#button>))

== SDL::Event2::Quit
終了要請イベントのクラスです。

終了イベントを無視すると、
ユーザーはウィンドウを閉じることが不可能になります。
一方で、終了イベントを受け入れるならば、
アプリケーションウィンドウは閉じられて
アプリケーションは見えなくなりますが、
画面更新はそれでも成功イベントを報告します。

== SDL::Event2::SysWM
プラットフォーム依存のウィンドウマネージャイベントのクラスです。

ウィンドウマネージャから処理できないイベントを受け取った時はいつでも
生成されます。Ruby/SDL からはいかなるイベントであるのかを知ることは
できません。ただ存在するだけで有用でないイベントです。
Ruby からは無視する以外のことはできません。

== SDL::Event2::VideoResize
ウィンドウのリサイズイベントのクラスです。

SDL::RESIZABLE が ((|flag|)) として ((<SDL.set_video_mode>)) に
渡された時は、ユーザーはアプリケーションウィンドウをリサイズすることが
許されます。
ウィンドウがリサイズされた時は、このイベントが発生し、
((<SDL::Event2::VideoResize#w>)) と ((<SDL::Event2::VideoResize#h>)) から
ウィンドウの新しい横幅と高さが得られます。

このイベントを受け取ると、ウィンドウは
((<SDL.set_video_mode>))を使って新しい寸法にリサイズされるはずです。

== SDL::Event2::VideoExpose
再描画に関するイベントのクラスです

このイベントは他のアプリケーション、通常はウインドウマネージャによってscreen
が変更されたときに発生し、再描画の必要性を通知します。

== SDL::Key
キーボード入力関連を取り扱うモジュールです。

キーボード関連の定数とモジュール関数が定義されています。

* ((<SDL::Key.scan>)) -- キーボードの状態のスナップショットをとります。
* ((<SDL::Key.press?>)) -- キーボードを押しているかどうかを返します。
* ((<SDL::Key.mod_state>)) -- モディファイアキーの状態を得ます。
* ((<SDL::Key.get_key_name>)) -- キーシンボルに対応する名前を得ます。
* ((<SDL::Key.enable_key_repeat>)) -- キーリピートレートを設定します。
* ((<SDL::Key.disable_key_repeat>)) -- キーリピートを無効にします。

=== キーシンボル
((<SDL::Key>)) にはキーボードのそれぞれのキーに対応する以下の定数が定義されています。
* SDL::Key::BACKSPACE  '\b'  backspace  
* SDL::Key::TAB  '\t'  tab  
* SDL::Key::CLEAR     clear クリア  
* SDL::Key::RETURN  '\r'  return  
* SDL::Key::PAUSE    pause  
* SDL::Key::ESCAPE  '^['  escape  
* SDL::Key::SPACE  ' '   space スペース  
* SDL::Key::EXCLAIM  '!'   exclaim 感嘆符  
* SDL::Key::QUOTEDBL  '"'   quotedbl 二重引用符   
* SDL::Key::HASH  '#'   hash ハッシュ(シャープ)  
* SDL::Key::DOLLAR  '$'   dollar ドル  
* SDL::Key::AMPERSAND  '&'   ampersand アンパサンド  
* SDL::Key::QUOTE  '''   quote 引用符  
* SDL::Key::LEFTPAREN  '('   left parenthesis 左丸括弧  
* SDL::Key::RIGHTPAREN  ')'   right parenthesis 右丸括弧  
* SDL::Key::ASTERISK  '*'   asterisk アスタリスク  
* SDL::Key::PLUS  '+'   plus sign プラス  
* SDL::Key::COMMA  ','   comma カンマ  
* SDL::Key::MINUS  '-'   minus sign マイナス  
* SDL::Key::PERIOD  '.'   period ピリオド  
* SDL::Key::SLASH  '/'   forward slash スラッシュ  
* SDL::Key::K0  '0'  0  
* SDL::Key::K1  '1'  1  
* SDL::Key::K2  '2'  2  
* SDL::Key::K3  '3'  3  
* SDL::Key::K4  '4'  4  
* SDL::Key::K5  '5'  5  
* SDL::Key::K6  '6'  6  
* SDL::Key::K7  '7'  7  
* SDL::Key::K8  '8'  8  
* SDL::Key::K9  '9'  9  
* SDL::Key::COLON  ':'   colon コロン  
* SDL::Key::SEMICOLON  ';'   semicolon セミコロン  
* SDL::Key::LESS  '&lt;'   less-than sign 小なり  
* SDL::Key::EQUALS  '='   equals sign イコール  
* SDL::Key::GREATER  '&gt;'   greater-than sign 大なり  
* SDL::Key::QUESTION  '?'   question mark 疑問符  
* SDL::Key::AT  '@'   at アットマーク  
* SDL::Key::LEFTBRACKET  '['   left bracket 左かぎ括弧  
* SDL::Key::BACKSLASH  '\'   backslash バックスラッシュ  
* SDL::Key::RIGHTBRACKET  ']'   right bracket 右かぎ括弧  
* SDL::Key::CARET  '^'   caret キャレット  
* SDL::Key::UNDERSCORE  '_'   underscore アンダースコア  
* SDL::Key::BACKQUOTE  '`'   grave 逆引用符  
* SDL::Key::A  'a'  a  
* SDL::Key::B  'b'  b  
* SDL::Key::C  'c'  c  
* SDL::Key::D  'd'  d  
* SDL::Key::E  'e'  e  
* SDL::Key::F  'f'  f  
* SDL::Key::G  'g'  g  
* SDL::Key::H  'h'  h  
* SDL::Key::I  'i'  i  
* SDL::Key::J  'j'  j  
* SDL::Key::K  'k'  k  
* SDL::Key::L  'l'  l  
* SDL::Key::M  'm'  m  
* SDL::Key::N  'n'  n  
* SDL::Key::O  'o'  o  
* SDL::Key::P  'p'  p  
* SDL::Key::Q  'q'  q  
* SDL::Key::R  'r'  r  
* SDL::Key::S  's'  s  
* SDL::Key::T  't'  t  
* SDL::Key::U  'u'  u  
* SDL::Key::V  'v'  v  
* SDL::Key::W  'w'  w  
* SDL::Key::X  'x'  x  
* SDL::Key::Y  'y'  y  
* SDL::Key::Z  'z'  z  
* SDL::Key::DELETE  '^?'  delete  
* SDL::Key::KP0     keypad 0 キーバッド(テンキー)の0  
* SDL::Key::KP1     keypad 1 キーバッドの1  
* SDL::Key::KP2     keypad 2 キーバッドの2  
* SDL::Key::KP3     keypad 3 キーバッドの3  
* SDL::Key::KP4     keypad 4 キーバッドの4  
* SDL::Key::KP5     keypad 5 キーバッドの5  
* SDL::Key::KP6     keypad 6 キーバッドの6  
* SDL::Key::KP7     keypad 7 キーバッドの7  
* SDL::Key::KP8     keypad 8 キーバッドの8  
* SDL::Key::KP9     keypad 9 キーバッドの9  
* SDL::Key::KP_PERIOD  '.'   keypad period キーバッドのピリオド  
* SDL::Key::KP_DIVIDE  '/'   keypad divide キーパッドの除算記号  
* SDL::Key::KP_MULTIPLY  '*'   keypad multiply キーバッドの乗算記号  
* SDL::Key::KP_MINUS  '-'   keypad minus キーバッドのマイナス  
* SDL::Key::KP_PLUS  '+'   keypad plus キーバッドのプラス  
* SDL::Key::KP_ENTER  '\r'   keypad enter キーパッドのenter  
* SDL::Key::KP_EQUALS  '='   keypad equals キーパッドのイコール  
* SDL::Key::UP     up arrow 上矢印  
* SDL::Key::DOWN     down arrow 下矢印  
* SDL::Key::RIGHT     right arrow 右矢印  
* SDL::Key::LEFT     left arrow 左矢印  
* SDL::Key::INSERT    insert  
* SDL::Key::HOME    home  
* SDL::Key::END    end  
* SDL::Key::PAGEUP    page up  
* SDL::Key::PAGEDOWN    page down  
* SDL::Key::F1    F1  
* SDL::Key::F2    F2  
* SDL::Key::F3    F3  
* SDL::Key::F4    F4  
* SDL::Key::F5    F5  
* SDL::Key::F6    F6  
* SDL::Key::F7    F7  
* SDL::Key::F8    F8  
* SDL::Key::F9    F9  
* SDL::Key::F10    F10  
* SDL::Key::F11    F11  
* SDL::Key::F12    F12  
* SDL::Key::F13    F13  
* SDL::Key::F14    F14  
* SDL::Key::F15    F15  
* SDL::Key::NUMLOCK    numlock  
* SDL::Key::CAPSLOCK    capslock  
* SDL::Key::SCROLLOCK    scrollock  
* SDL::Key::RSHIFT     right shift 右shift  
* SDL::Key::LSHIFT     left shift 左shift  
* SDL::Key::RCTRL     right ctrl 右ctrl  
* SDL::Key::LCTRL     left ctrl 左ctrl  
* SDL::Key::RALT     right alt 右alt  
* SDL::Key::LALT     left alt 左alt  
* SDL::Key::RMETA     right meta 右meta  
* SDL::Key::LMETA     left meta 左meta  
* SDL::Key::LSUPER     left windows key 左windowsキー  
* SDL::Key::RSUPER     right windows key 右windowsキー  
* SDL::Key::MODE     mode shift モードシフト  
* SDL::Key::HELP    help  
* SDL::Key::PRINT    print-screen  
* SDL::Key::SYSREQ    SysRq  
* SDL::Key::BREAK    break  
* SDL::Key::MENU    menu  
* SDL::Key::POWER    power  
* SDL::Key::EURO     euro ユーロ  

== SDL::Mouse
マウス入力関連を取り扱うモジュールです。

マウス関連の定数とモジュール関数が定義されています。

* ((<SDL::Mouse.state>)) -- 現在のマウスの状態を得ます。
* ((<SDL::Mouse.warp>)) -- マウスカーソルの位置をセットします。
* ((<SDL::Mouse.show>)) -- カーソルが画面に表示されるようにします。
* ((<SDL::Mouse.hide>)) -- カーソルが画面に表示されないようにします。
* ((<SDL::Mouse.show?>)) -- カーソルが画面に表示されているかどうかを返します。
* ((<SDL::Mouse.set_cursor>)) -- 現在アクティブなマウスカーソルを設定します。
== Methods

--- SDL::Event2.poll

    現在留まっているイベントを取り出し、イベントがあるときはそのイベントを、
    無いときは nil を返します。イベントが取り出されたときは
    キューからそのイベントを削除します。


    EXAMPLE
      while event = SDL::Event2.poll #キューに残っているイベントがなくなるまでループ
        case event # 適切なイベントタイプを処理
        when SDL::Event2::KeyDown # キー押下イベントを処理
          puts "あ! キーを押しましたね"
        when SDL::Event2::MouseMotion
          .
          .
          .
        else # 未処理のイベントを報告
          puts 私にはよく分からないイベントです!"
        end
      end

    * See Also
      
      ((<SDL::Event2>)), ((<SDL::Event2.wait>))

--- SDL::Event2.wait

    次の利用可能なイベントが来るまで無限に待機し、
    イベントが来たらそのイベントを返します。
    
    返したイベントはキューから削除されます。

    イベントを待っている間にエラーがあった場合は例外 ((<SDL::Error>)) を
    発生させます。

    * See Also
      
      ((<SDL::Event2.poll>))

--- SDL::Event2.push(event)

    ((|event|)) で指定したイベントをイベントキューにプッシュします。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * NOTES

      デバイス入力イベントをキューにプッシュしても、
      SDL 内のデバイスの状態は変わりません。

    * See Also
      
      ((<SDL::Event2.poll>))

--- SDL::Event2.app_state
--- SDL::Event2.appState

    アプリケーションの現在の状態を返します。戻り値は以下のビット和です。
    :SDL::Event2::APPMOUSEFOCUS
      マウスのフォーカスがあります。
    :SDL::Event2::APPINPUTFOCUS
      キーボードのフォーカスがあります。
    :SDL::Event2::APPACTIVE
      アプリケーションは可視状態です。

    * See Also
      
      ((<SDL::Event2::Active>))

--- SDL::Event2.enable_unicode
--- SDL::Event2.enableUNICODE

    キーイベントに対応した文字コードを得るために、
    まずこの関数を呼び出してUnicode変換を有効にしなければいけません。
    変換を有効にすると、キーボードイベントのたびにちょっとした
    オーバーヘッドが発生するため、デフォルトでは変換は無効になっています。
    変換を有効にすると、以後のキーダウンイベントでは、
    ((<SDL::Event2::KeyDown#unicode>)) から対応する文字コードが得られます。
    対応する文字コードが見つからないときは0が入ります。

    * NOTES

      変換が有効なのはキーダウンイベントのみです。
      キーリリースイベントは変換されません。

    * See Also
      
      ((<SDL::Event2.disable_unicode>)), ((<SDL::Event2.enable_unicode?>))

--- SDL::Event2.disable_unicode
--- SDL::Event2.disableUNICODE

    UNICODE変換を無効にします。詳しくは ((<SDL::Event2.enable_unicode>))
    を見てください。

--- SDL::Event2.enable_unicode?
--- SDL::Event2.enableUNICODE?

    UNICODE変換が有効かどうか調べます。詳しくは ((<SDL::Event2.enable_unicode>))
    を見てください。

--- SDL::Event2::Active#gain

    可視性を得たことに対応するイベントなら true を、
    失ったことに対応するイベントなら false を返します。

    * See Also
      
      ((<SDL::Event2::Active>)), ((<SDL::Event2::Active#state>))

--- SDL::Event2::Active#state

    マウスカーソルがウインドウの外に出たり(gain=false)、ウインドウ内に
    入ったり(gain=true)したときは、SDL::Event2::APPMOUSEFOCUS を返します。
    
    アプリケーションがキーボードフォーカスを得たり(gain=true)
    失ったり(gain=false)したときは、SDL::Event2::APPINPUTFOCUS を
    返します。これは通常他のアプリケーションがアクティブに
    なったときに発生します。
    
    アプリケーションが最小化/アイコン化されたり(gain=false)
    元に戻ったとき(gain=true)には SDL::Event2::APPACTIVE を返します。

    * See Also
      
      ((<SDL::Event2::Active>)), ((<SDL::Event2::Active#gain>))

--- SDL::Event2::KeyDown#press

    常に true を返します。

    * See Also
      
      ((<SDL::Event2::KeyUp#press>))

--- SDL::Event2::KeyDown#sym

    何のキーを押したかを((<キーシンボル>))で返します。

    * See Also
      
      ((<SDL::Event2::KeyDown#unicode>))

--- SDL::Event2::KeyDown#mod

    キー押下時のキーモディファイアの状態を返します。
    返り値は ((<SDL::Key.mod_state>)) で得られるものと同じです。

    * See Also
      
      ((<SDL::Key.mod_state>))

--- SDL::Event2::KeyDown#unicode

    ((<SDL::Event2.enable_unicode>)) によって UNICODE 変換が有効にされた時には、
    キーの押下に対応する UNICODE 文字を返します。
    文字の上位 9 ビットが 0 の場合は、 ASCII 文字に対応しています。
    
    変換が有効でない場合には0 を返します。

--- SDL::Event2::KeyUp#press

    常に false を返します。

    * See Also
      
      ((<SDL::Event2::KeyDown#press>))

--- SDL::Event2::KeyUp#sym

    何のキーを離したかを((<キーシンボル>))で返します。

--- SDL::Event2::KeyUp#mod

    キーモディファイアの状態を返します。
    返り値は ((<SDL::Key.mod_state>)) で得られるものと同じです。

    * See Also
      
      ((<SDL::Key.mod_state>))

--- SDL::Event2::MouseMotion#state

    現在のボタンの状態を返します。
    以下の定数の論理和を取ったものを返します。
    
    :SDL::Mouse::BUTTON_LMASK
      左ボタン
    :SDL::Mouse::BUTTON_MMASK
      中央ボタン
    :SDL::Mouse::BUTTON_RMASK
      右ボタン

    * See Also
      
      ((<SDL::Mouse.state>))

--- SDL::Event2::MouseMotion#x

    マウスの X 座標を正の整数で返します。

    * See Also
      
      ((<SDL::Mouse.state>))

--- SDL::Event2::MouseMotion#y

    マウスの Y 座標を正の整数で返します。

    * See Also
      
      ((<SDL::Mouse.state>))

--- SDL::Event2::MouseMotion#xrel

    マウスの X 座標の相対的な動きを整数で返します。

--- SDL::Event2::MouseMotion#yrel

    マウスの Y 座標の相対的な動きを整数で返します。

--- SDL::Event2::MouseButtonDown#button

    どのボタンが押されたのかを返します。左、中央、右のボタンに対応して
    * SDL::Mouse::BUTTON_LEFT
    * SDL::Mouse::BUTTON_MIDDLE
    * SDL::Mouse::BUTTON_RIGHT
    が得られます。

--- SDL::Event2::MouseButtonDown#press

    ボタン押し下げイベントかどうかを返します。
    常に true を返します。

    * See Also
      
      ((<SDL::Event2::MouseButtonUp#press>))

--- SDL::Event2::MouseButtonDown#x

    マウスの X 座標を正の整数で返します。

    * See Also
      
      ((<SDL::Mouse.state>))

--- SDL::Event2::MouseButtonDown#y

    マウスの Y 座標を正の整数で返します。

    * See Also
      
      ((<SDL::Mouse.state>))

--- SDL::Event2::MouseButtonUp#button

    どのボタンが離されたのかを返します。左、中央、右のボタンに対応して
    * SDL::Mouse::BUTTON_LEFT
    * SDL::Mouse::BUTTON_MIDDLE
    * SDL::Mouse::BUTTON_RIGHT
    が得られます。

--- SDL::Event2::MouseButtonUp#press

    ボタン押し下げイベントかどうかを返します。
    常に false を返します。

    * See Also
      
      ((<SDL::Event2::MouseButtonDown#press>))

--- SDL::Event2::MouseButtonUp#x

    マウスの X 座標を正の整数で返します。

    * See Also
      
      ((<SDL::Mouse.state>))

--- SDL::Event2::MouseButtonUp#y

    マウスの Y 座標を正の整数で返します。

    * See Also
      
      ((<SDL::Mouse.state>))

--- SDL::Event2::JoyAxis#which

    イベントが発生したジョイスティックのインデックスを返します。

    * See Also
      
      ((<SDL::Joystick>)), ((<SDL::Joystick#num_axes>))

--- SDL::Event2::JoyAxis#axis

    イベントが発生した軸のインデックスを返します。

    * See Also
      
      ((<SDL::Joystick>))

--- SDL::Event2::JoyAxis#value

    軸の現在の位置を -32767 から 32767 までの整数で返します。

    * See Also
      
      ((<SDL::Joystick>)), ((<SDL::Joystick#axis>))

--- SDL::Event2::JoyBall#which

    イベントが発生したジョイスティックのインデックスを返します。

    * See Also
      
      ((<SDL::Joystick>))

--- SDL::Event2::JoyBall#ball

    イベントが発生したジョイスティックのトラックボールの
    インデックスを返します。

    * See Also
      
      ((<SDL::Joystick>)), ((<SDL::Joystick#num_balls>))

--- SDL::Event2::JoyBall#xrel

    X方向の相対的な動きを整数で返します。

    * See Also
      
      ((<SDL::Joystick>)), ((<SDL::Joystick#ball>))

--- SDL::Event2::JoyBall#yrel

    Y方向の相対的な動きを整数で返します。

    * See Also
      
      ((<SDL::Joystick>)), ((<SDL::Joystick#ball>))

--- SDL::Event2::JoyHat#which

    イベントが発生したジョイスティックのインデックスを返します。

    * See Also
      
      ((<SDL::Joystick>))

--- SDL::Event2::JoyHat#hat

    イベントが発生したジョイスティックのハットスイッチのインデックスを返します。

    * See Also
      
      ((<SDL::Joystick>)), ((<SDL::Joystick#num_hats>))

--- SDL::Event2::JoyHat#value

    イベントが発生したハットスイッチの現在の位置を以下の値の論理和で
    返します。
    
    * SDL::Joystick::HAT_CENTERED
    * SDL::Joystick::HAT_UP
    * SDL::Joystick::HAT_RIGHT
    * SDL::Joystick::HAT_DOWN
    * SDL::Joystick::HAT_LEFT
    * SDL::Joystick::HAT_RIGHTUP
    * SDL::Joystick::HAT_RIGHTDOWN
    * SDL::Joystick::HAT_LEFTUP
    * SDL::Joystick::HAT_LEFTDOWN

--- SDL::Event2::JoyButtonDown#which

    イベントが発生したジョイスティックのインデックスを返します。

    * See Also
      
      ((<SDL::Joystick>))

--- SDL::Event2::JoyButtonDown#button

    イベントが発生したジョイスティックのボタンのインデックスを返します。

    * See Also
      
      ((<SDL::Joystick>)), ((<SDL::Joystick#num_buttons>))

--- SDL::Event2::JoyButtonDown#press

    ボタン押し下げイベントかどうかを返します。
    常に true を返します。

    * See Also
      
      ((<SDL::Event2::JoyButtonUp#press>)), ((<SDL::Joystick#button>))

--- SDL::Event2::JoyButtonUpwhich

    イベントが発生したジョイスティックのインデックスを返します。

    * See Also
      
      ((<SDL::Joystick>))

--- SDL::Event2::JoyButtonUp#button

    イベントが発生したジョイスティックのボタンのインデックスを返します。

    * See Also
      
      ((<SDL::Joystick>)), ((<SDL::Joystick#num_buttons>))

--- SDL::Event2::JoyButtonUp#press

    ボタン押し下げイベントかどうかを返します。
    常に false を返します。

    * See Also
      
      ((<SDL::Event2::JoyButtonDown#press>)), ((<SDL::Joystick#button>))

--- SDL::Event2::VideoResize#w

    ウィンドウがリサイズされたときに、
    ウィンドウの新しい幅を整数で返します。

--- SDL::Event2::VideoResize#h

    ウィンドウがリサイズされたときに、
    ウィンドウの新しい高さを整数で返します。

--- SDL::Key.scan

    キーボードの状態のスナップショットをとります。
    ((<SDL::Key.press?>))を使いこの関数で取った状態の情報を得ます。
    
    この状態は ((<SDL::Event2.poll>)) や ((<SDL::Event2.wait>)) を呼ばないと更新されません。

    * See Also
      
      ((<SDL::Key.press?>)), ((<SDL::Event2::KeyDown>)), ((<SDL::Event2::KeyUp>)), ((<SDL::Event2.poll>))

--- SDL::Key.press?(key)

    ((|key|))で指定したキーを押しているかどうかを返します。ここで返す値は
    最も最近に呼んだ ((<SDL::Key.scan>)) の時点での状態に基きます。
    ((|key|)) として((<キーシンボル>))を与えてください。

    * See Also
      
      ((<SDL::Key.scan>)), ((<SDL::Event2::KeyDown>)), ((<SDL::Event2::KeyUp>))

--- SDL::Key.mod_state
--- SDL::Key.modState

    モディファイアキー(CTRL、ALTなど)の状態を返します。
    以下の値の論理和が帰ります。
    :SDL::Key::MOD_NONE
      何も押していない
    :SDL::Key::MOD_LSHIFT
      左シフト
    :SDL::Key::MOD_RSHIFT
      右シフト
    :SDL::Key::MOD_LCTRL
      左コントロール
    :SDL::Key::MOD_RCTRL
      右コントロール
    :SDL::Key::MOD_LALT
      左ALT
    :SDL::Key::MOD_RALT
      右ALT
    :SDL::Key::MOD_LMETA
      左メタキー
    :SDL::Key::MOD_RMETA
      右メタキー
    :SDL::Key::MOD_NUM
      NumLock
    :SDL::Key::MOD_CAPS
      Caps
    :SDL::Key::MOD_MODE
     
    以下のような定数も定義されています。
    * SDL::Key::MOD_CTRL = SDL::Key::MOD_LCTRL|SDL::Key::MOD_RCTRL
    * SDL::Key::MOD_SHIFT = SDL::Key::MOD_LSHIFT|SDL::Key::MOD_RSHIFT
    * SDL::Key::MOD_ALT = SDL::Key::MOD_LALT|SDL::Key::MOD_RALT
    * SDL::Key::MOD_META = SDL::Key::MOD_LMETA|SDL::Key::MOD_RMETA

    * See Also
      
      ((<SDL::Key.scan>))

--- SDL::Key.get_key_name(key)
--- SDL::Key.getKeyName(key)

    ((|key|)) で与えた((<キーシンボル>))に対応する文字列を返します。

--- SDL::Key.enable_key_repeat(delay,interval)
--- SDL::Key.enableKeyRepeat(delay,interval)

    キーリピートレートを有効にします。
    ((|delay|)) は、リピートが開始されるまでの
    時間を指定します。
    その後に、((|interval|))で指定された
    レートでリピートが始まります。
    ((|delay|)) と ((|interval|)) は
    どちらもミリセカンド単位で指定します。
    
    デフォルト値はそれぞれ SDL::Key::DEFAULT_REPEAT_DELAY と
    SDL::Key::DEFAULT_REPEAT_INTERVAL という定数で定義されています。

    レートの変更に失敗すると例外 SDL::Error が発生します。

    * See Also
      
      ((<SDL::Key.disable_key_repeat>))

--- SDL::Key.disable_key_repeat
--- SDL::Key.disableKeyRepeat

    キーリピートを無効にします。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * See Also
      
      ((<SDL::Key.enable_key_repeat>))

--- SDL::Mouse.state

    現在のマウスの状態を以下のような要素5個の配列で得ます。
      [ マウスのX座標, マウスのY座標, 左ボタンが押されているか？, 中央ボタンが押されているか？, 右ボタンが押されているか？ ]


    EXAMPLE
      x, y, lbutton, * = SDL::Mouse.state
      if lbutton
        print "マウス左ボタン が押されました。\n"
      end

    * See Also
      
      ((<SDL::Event2::MouseMotion>)), ((<SDL::Event2::MouseButtonDown>)), ((<SDL::Event2::MouseButtonUp>))

--- SDL::Mouse.warp(x,y)

    マウスカーソルの位置をセットします。(マウスモーションイベントを発生させます)

    * See Also
      
      ((<SDL::Event2::MouseMotion>))

--- SDL::Mouse.show

    カーソルを表示します。
    
    カーソルは最初は表示されていますが、非表示にすることもできます。

    * See Also
      
      ((<SDL::Mouse.hide>)), ((<SDL::Mouse.show?>))

--- SDL::Mouse.hide

    カーソルを非表示にします。

    * See Also
      
      ((<SDL::Mouse.show>)), ((<SDL::Mouse.show?>))

--- SDL::Mouse.show?

    カーソルが画面に表示されているなら trueを、 いなければ false を返します。

    * See Also
      
      ((<SDL::Mouse.show>)), ((<SDL::Mouse.hide>))

--- SDL::Mouse.set_cursor(bitmap,white,black,transparent,inverted,hot_x=0,hot_y=0)
--- SDL::Mouse.setCursor(bitmap,white,black,transparent,inverted,hot_x=0,hot_y=0)

    現在アクティブなカーソルを指定されたものに設定します。
    カーソルが現在見える状態にあるときは、この変更はすぐに表示に反映されます。
    
    カーソルは ((|bitmap|)) で ((<SDL::Surface>)) のインスタンスを指定します。
    カーソルは白黒2色で作られます。((|white|)) が白に対応するピクセル値、
    ((|black|)) が黒に対応するピクセル値、((|transparent|))は透明に対応するピクセル値、
    ((|inverted|)) は反転色(なければ黒)に対応するピクセル値です。
    またカーソルの横幅は 8 の倍数でなければいけません。
    
    ((|hot_x|))、((|hot_y|)) はビットマップのどの点をマウスカーソルの位置とするかを
    指定します。

    * See Also
      
      ((<SDL::Surface>))

= Joystick
* ((<Joystick機能概説>))
* ((<SDL::Joystick>))
* ジョイスティック関連メソッド
  * ((<SDL::Joystick.num>)) -- 利用可能なジョイスティックの数を数えます。
  * ((<SDL::Joystick.index_name>)) -- ジョイスティック名を取得します。
  * ((<SDL::Joystick.open>)) -- ジョイスティックを使うためオープンします。
  * ((<SDL::Joystick.open?>)) -- ジョイスティックがオープンされているかどうかを調べます。
  * ((<SDL::Joystick#index>)) -- ジョイスティックのインデックス番号を返します。
  * ((<SDL::Joystick#num_axes>)) -- ジョイスティックの軸の数を取得します。
  * ((<SDL::Joystick#num_balls>)) -- ジョイスティックのトラックボールの数を取得します。
  * ((<SDL::Joystick#num_hats>)) -- ジョイスティックのハットスイッチの数を取得します。
  * ((<SDL::Joystick#num_buttons>)) -- ジョイスティックのボタンの数を取得します。
  * ((<SDL::Joystick.poll=>)) -- ジョイスティックイベントのポーリングを有効/無効にします。
  * ((<SDL::Joystick.poll>)) -- ジョイスティックイベントのポーリングが有効かどうかを調べます。
  * ((<SDL::Joystick.update_all>)) -- すべてのジョイスティックの状態を更新します。
  * ((<SDL::Joystick#axis>)) -- 軸の現在の状態を取得します。
  * ((<SDL::Joystick#hat>)) -- ジョイスティックのハットスイッチの現在の状態を取得します。
  * ((<SDL::Joystick#button>)) -- 指定されたボタンの現在の情報を返します。
  * ((<SDL::Joystick#ball>)) -- トラックボールの相対的な動きを取得します。

== Joystick機能概説
ジョイスティック、またそれに近い他のデバイスは、
ゲームプレイにおける非常に強い役割を持っており、
SDL はそれらを広範囲にサポートしています。
軸、ボタン、POV ハットスイッチ、そしてトラックボールは
全てサポートされてます。

ジョイスティックのサポートは
((<SDL.init>)) に SDL::INIT_JOYSTICK フラグを渡すことで初期化されます。
いったん初期化されたジョイスティックは
((<SDL::Joystick.open>)) で
オープンされなければいけません。

ここに書かれているメソッドを使う時、
ジョイスティックにこちらからアクセスして読み込むのが
最良の方法のように思えますが、たいていの場合そうではありません。
理想的には、ジョイスティックは((<イベント|SDL::Event>))
システムを使って読み込むべきです。
これを可能にするために、((<SDL::Joystick.poll=>))
を使ってジョイスティックのイベント処理状態を設定しなければなりません。
もちろん、ジョイスティックを使う前に((<オープン|SDL::Joystick.open>))
しなければなりません。

* NOTES

  イベントキューを通してジョイスティックを扱っているので
  ((*なければ*))、 ((<SDL::Joystick.update_all>))
  を呼んでジョイスティックの更新を明示的に要求する必要があります。

  フォースフィードバックはまだサポートされていません。

== SDL::Joystick
個々のジョイステックから入力情報を得るためのクラスです。

* ((<SDL::Joystick.num>)) -- 利用可能なジョイスティックの数を数えます。
* ((<SDL::Joystick.index_name>)) -- ジョイスティック名を取得します。
* ((<SDL::Joystick.open>)) -- ジョイスティックを使うためオープンします。
* ((<SDL::Joystick.open?>)) -- ジョイスティックがオープンされているかどうかを調べます。
* ((<SDL::Joystick#index>)) -- ジョイスティックのインデックス番号を返します。
* ((<SDL::Joystick#num_axes>)) -- ジョイスティックの軸の数を取得します。
* ((<SDL::Joystick#num_balls>)) -- ジョイスティックのトラックボールの数を取得します。
* ((<SDL::Joystick#num_hats>)) -- ジョイスティックのハットスイッチの数を取得します。
* ((<SDL::Joystick#num_buttons>)) -- ジョイスティックのボタンの数を取得します。
* ((<SDL::Joystick.poll=>)) -- ジョイスティックイベントのポーリングを有効/無効にします。
* ((<SDL::Joystick.poll>)) -- ジョイスティックイベントのポーリングが有効かどうかを調べます。
* ((<SDL::Joystick.update_all>)) -- すべてのジョイスティックの状態を更新します。
* ((<SDL::Joystick#axis>)) -- 軸の現在の状態を取得します。
* ((<SDL::Joystick#hat>)) -- ジョイスティックのハットスイッチの現在の状態を取得します。
* ((<SDL::Joystick#button>)) -- 指定されたボタンの現在の情報を返します。
* ((<SDL::Joystick#ball>)) -- トラックボールの相対的な動きを取得します。

== Methods

--- SDL::Joystick.num

    システムに接続されたジョイスティックの数を数えます。

    * See Also
      
      ((<SDL::Joystick.index_name>)), ((<SDL::Joystick.open>))

--- SDL::Joystick.index_name(index)
--- SDL::Joystick.indexName(index)

    実装に依存するジョイスティック名を文字列で取得します。
    ((|index|)) パラメータはシステム上のジョイスティック番号を指します。


    EXAMPLE
      # 接続された全てのジョイスティックの名前を表示
      num_joy = SDL::Joystick.num
      printf("%d 本のジョイスティックが見つかりました\n", num_joy)
      num_joy.times do |i|
        puts SDL::Joystick.index_name(i)
      end

    * See Also
      
      ((<SDL::Joystick.open>))

--- SDL::Joystick.open(index)

    SDL 内でジョイスティックを使うためオープンします。
    ((|index|)) はシステムにおけるジョイスティックの番号を指します。
    ジョイスティックはゲームで使用する前にオープンされる必要があります。
    
    ジョイスティック番号は 0 から SDL::Joystick.num - 1 までが有効です。

    ((<SDL::Joystick>))のインスタンスを返します。

    失敗したときには例外((<SDL::Error>))を発生させます。


    EXAMPLE
      # ジョイスティックがあるかチェック
      if SDL::Joystick.num > 0
        # ジョイスティックをオープンする
        joy = SDL::Joystick.open(0)
      
        printf("0番のジョイスティックを開きました\n");
        printf("名前: %s\n", SDL::Joystick.name(0))
        printf("軸の数: %d\n", joy.num_axes)
        printf("ボタンの数: %d\n", joy.num_buttons)
        printf("ボールの数: %d\n", joy.num_balls)
      end  

--- SDL::Joystick.open?(index)

    アプリケーションの中でジョイスティックがオープンされているかどうかを調べます。
    ((|index|)) はシステムにおけるジョイスティックの番号を指します。

    ジョイスティックが既にオープンされている場合は true を、
    そうでない場合は false を返します。

    * See Also
      
      ((<SDL::Joystick.open>))

--- SDL::Joystick#index

    ((|self|)) のインデックス番号を返します。

--- SDL::Joystick#num_axes
--- SDL::Joystick#numAxes

    利用可能な軸の数を返します。

    * NOTES

      縦軸と横軸を持つような入力装置(いわゆるアナログスティック)は軸が
      2つと数えられます。

    * See Also
      
      ((<SDL::Joystick#axis>))

--- SDL::Joystick#num_balls
--- SDL::Joystick#numBalls

    利用可能なトラックボールの数を返します。

    * See Also
      
      ((<SDL::Joystick#ball>))

--- SDL::Joystick#num_hats
--- SDL::Joystick#numHats

    利用可能なハットスイッチの数を返します。

    * See Also
      
      ((<SDL::Joystick#hat>))

--- SDL::Joystick#num_buttons
--- SDL::Joystick#numButtons

    利用可能なボタンの数を返します。

    * See Also
      
      ((<SDL::Joystick#button>))

--- SDL::Joystick.poll=(enable)

    ジョイスティックイベントの処理を有効または無効にするために使われます。
    ジョイスティックイベントの処理が無効の状態では、((<SDL::Joystick.update_all>))
    を使ってジョイスティックの状態を更新し、
    手動でジョイスティックの情報を読み込む必要があります。
    
    デフォルトでは有効になっています。

    * See Also
      
      ((<SDL::Joystick.update_all>)), ((<SDL::Joystick.poll>)), ((<SDL::Event2::JoyAxis>)), ((<SDL::Event2::JoyBall>)), ((<SDL::Event2::JoyButtonDown>)), ((<SDL::Event2::JoyButtonUp>)), ((<SDL::Event2::JoyHat>))

--- SDL::Joystick.poll

    ジョイスティックイベントの処理が有効ならば true を、無効なら false を返し
    ます。詳しくは ((<SDL::Joystick.poll=>)) を見てください。

--- SDL::Joystick.update_all
--- SDL::Joystick.updateAll

    オープンされたすべてのジョイスティックの状態(位置・ボタンなど)を更新します。
    ((<SDL::Joystick.poll=>))
    によってジョイスティックイベントが有効になっている場合は、
    イベントループの中で自動的に呼ばれます。

--- SDL::Joystick#axis(axis_index)

    ((|self|)) の((|axis_index|)) で指定した軸の現在の状態を返します。
    
    最近のほとんどのジョイスティックでは、
    X 軸は通常 axis 0、
    Y 軸は axis 1 で表現されています。
    このメソッドによって返される値は、軸の現在の位置を表わす
    符号付き整数 (-32768 から 32768 まで) であり、
    ぶれを考慮するためこれらの値に適当な閾値を設定しておく必要があるでしょう。


    EXAMPLE
      joy = SDL::Joystick.open(0)
        .
        .
      x_move = joy.axis(0)
      y_move = joy.axis(1)

    * See Also
      
      ((<SDL::Joystick#num_axes>))

--- SDL::Joystick#hat(hat_index)

    ((|hat_index|)) で指定したハットスイッチの現在の状態を取得します。

    現在の状態は、
    以下に挙げる値の 1 つまたは複数の OR による組み合わせとして
    定義される符号無し整数の値として返されます。
    
    * SDL::Joystick::HAT_CENTERED
    * SDL::Joystick::HAT_UP
    * SDL::Joystick::HAT_RIGHT
    * SDL::Joystick::HAT_DOWN
    * SDL::Joystick::HAT_LEFT
    * SDL::Joystick::HAT_RIGHTUP
    * SDL::Joystick::HAT_RIGHTDOWN
    * SDL::Joystick::HAT_LEFTUP
    * SDL::Joystick::HAT_LEFTDOWN

    * See Also
      
      ((<SDL::Joystick#num_hats>))

--- SDL::Joystick#button(button_index)

    ((|button_index|)) で指定されたボタンの現在の情報を返します。
    ボタンが押下状態にある場合は true を、離されている場合は false を
    返します。

    * See Also
      
      ((<SDL::Joystick#num_buttons>))

--- SDL::Joystick#ball(ball_index)

    ((|ball_index|)) で指定したボールの相対的な変化を取得します。
    
    トラックボールは
    前回のこのメソッドの呼び出しからの
    相対的な動きだけを返すことができ、これらの動きの変化は
    [dx, dy] という形の整数2個の配列で得られます。

    失敗したときには例外((<SDL::Error>))を発生させます。


    EXAMPLE
      delta_x, delta_y = joy.ball(0)
      printf("トラックボールの相対移動値- X:%d, Y:%d\n", delta_x, delta_y)

= CD-ROM
* ((<CD-ROM機能概説>))
* ((<SDL::CD>))
* ((<CD-ROM関連メソッド>))
  * ((<SDL::CD.num_drives>)) -- システム上の CD-ROM の数を返します。
  * ((<SDL::CD.index_name>)) -- CD-ROM について、人間に読めるシステム非依存の ID を返します。
  * ((<SDL::CD.open>)) -- CD-ROM ドライブにアクセスするためにオープンします。
  * ((<SDL::CD#status>)) -- 指定されたドライブの現在の状態を返します。
  * ((<SDL::CD#play>)) -- CD を再生します。
  * ((<SDL::CD#play_tracks>)) -- 指定された CD トラックを再生します。
  * ((<SDL::CD#pause>)) -- CD-ROM の再生を一時停止します。
  * ((<SDL::CD#resume>)) -- CD-ROM の再生を再開します。
  * ((<SDL::CD#stop>)) -- CD-ROM の再生を停止します。
  * ((<SDL::CD#eject>)) -- CD-ROM を取り出します。
  * ((<SDL::CD#num_tracks>)) -- CD のトラック数を返します。
  * ((<SDL::CD#current_track>)) -- 現在のトラックを返します。
  * ((<SDL::CD#current_frame>)) -- トラック内の現在のフレームオフセット値を返します。
  * ((<SDL::CD#track_type>)) -- トラックの種類を返します。
  * ((<SDL::CD#track_length>)) -- トラックの長さを返します。
  * ((<SDL::CD#in_drive?>)) -- ドライブにディスクがあるかどうかを調べます。
  * ((<SDL::CD.frames_to_msf>)) -- フレーム数を分/秒/フレームに分解します。
  * ((<SDL::CD.msf_to_frames>)) -- 分/秒/フレームという値をフレーム数に変換します。

== CD-ROM機能概説
SDL は一度に 32 までのローカル CD-ROM ドライブの
オーディオ制御をサポートします。

トラック一覧の取得・再生・停止そして CD-ROM の取り出しを含む、
CD プレーヤの全ての基本的な機能を実行するためにこの API を使います。
(現在はマルチチェンジャーの CD ドライブはサポートしていません)

Ruby/SDL のどの CD-ROM 関連メソッドを呼ぶ前に、
まず ((<SDL.init>))(SDL::INIT_CDROM) を呼ばなければいけません。
これは CD-ROM ドライブを探してシステムをスキャンし、
プログラムがオーディオ制御できるようセットアップします。

ライブラリを初期化した後は、
((<SDL::CD.num_drives>)) を使って
利用可能なドライブがいくつあるかを知ることができます。
リストの最初のドライブはデフォルト CD-ROM ドライブです。
ドライブを選択し、((<SDL::CD.open>)) でオープンした後は、
ステータスをチェックし CD がドライブにあるなら再生を開始することができます。

CD-ROM は 1 つまたはそれ以上のトラックで構成され、
個々のトラックはある数の「フレーム」で構成されています。
フレームは CD の基礎データの単位で、
それぞれのフレームはサイズにして 2K であり、
CD は通常の再生スピードにおいて 1 秒間に 75(= SDL::CD::FPS)
フレーム再生されます。
SDL は CD 上のフレーム数を使って動作しますが、
((<SDL::CD.frames_to_msf>)) を使うことで、
より見慣れた分/秒のフォーマットに簡単に変換することができます。
またこの変換の逆は ((<SDL::CD.msf_to_frames>)) でできます。

== SDL::CD
((<SDL::CD.open>)) によってオープンされた CDROM デバイスを表し、
ディスクにおけるトラックのレイアウトの情報を格納します。

== CD-ROM関連メソッド

--- SDL::CD.num_drives
--- SDL::CD.numDrives

    システム上の CD-ROM の数を返します。

    * See Also
      
      ((<SDL::CD.open>))

--- SDL::CD.index_name(drive)
--- SDL::CD.indexName(drive)

    CD-ROM について、人間に読めるシステム非依存の ID を文字列で返します。
    ((|drive|)) はドライブのインデックス番号です。
    インデックス番号は 0 で始まり、((<SDL::CD.num_drives>))-1 で
    終わります。
    
    返り値は例えば以下のような文字列です。
    * "/dev/cdrom"
    * "E:"
    * "/dev/disk/ide/1/master"

    * See Also
      
      ((<SDL::CD.num_drives>))

--- SDL::CD.open(drive)

    CD-ROM ドライブにアクセスするためにオープンします。
    成功した場合は ((<SDL::CD>)) のインスタンスを返します。

    ドライブが正しくないか、ビジー状態のときは例外 ((<SDL::Error>)) を発生させます。


    EXAMPLE
      SDL.init SDL::INIT_CDROM
      
      # CD ドライブをチェック 
      if SDL::CD.num_drives == 0
        # 見つからなかった 
        STDERR.print "利用可能な CDROM デバイスがありません\n"
        exit 255
      end
      
      begin
        # デフォルトドライブをオープン
        cdrom = SDL::CD.open(0)
      rescue SDL::Error
        # オープンできなかった
        STDERR.puts "ドライブがオープンできませんでした"
        exit 255
      end
      
      # ボリュームの情報を表示 
      printf "名前: %s\n", SDL::CD.index_name(0)
      printf "トラック数: %d\n", cdrom.num_tracks
      num_tracks.times do |cur_track|
        min, sec, frame = SDL::CD.frames_to_msf(cdrom.track_length(cur_track))
        printf "\tトラック %d: 長さ %d:%d\n", cur_track, min, sec
      end

--- SDL::CD#status

    この関数は指定されたドライブの現在の状態を返します。
    状態は次のいずれかです。
    * SDL::CD::TRAYEMPTY
    * SDL::CD::STOPPED
    * SDL::CD::PLAYING
    * SDL::CD::PAUSED
    * SDL::CD::ERROR
    
    ドライブに CD が入っていると、
    ((<SDL.current_track>)), ((<SDL.current_frame>)), ((<SDL.num_tracks>)), ((<SDL.track_type>)),
    ((<SDL.track_lenght>))の情報が更新されます。


    EXAMPLE
      def play_track(track)
        raise "not cd in drive" unless $cdrom.in_drive?
      
        # 実際の CD のトラック数で切り捨て
        track = $cdrom.num_tracks-1 if track >= $cdrom.num_tracks
        $cdrom.play_tracks(track, 0, 1, 0)
      end

--- SDL::CD#play(start, length)

    ((|self|)) で示されるCDを
    フレーム ((|start|))から
    ((|length|)) フレームだけ
    再生します。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * See Also
      
      ((<SDL::CD#play_tracks>))

--- SDL::CD#play_tracks(start_track, start_frame, ntracks, nframes)

    ((|start_track|)) 番目のトラックから
    ((|ntracks|)) トラック分、
    指定された CD を再生します。
    
    ((|start_frame|)) は
    再生を始める ((|start_track|)) の先頭から数えた
    フレームのオフセット値です。
    ((|nframes|)) は
    再生を終了する最後のトラック
    (((|start_track|))+((|ntracks|))) の
    先頭から数えたフレームのオフセット値です。
    
    このメソッドは、((<SDL::CD#status>))を
    呼んで CD のトラック情報を取得した後にのみ、呼ぶべきです。

    失敗したときには例外((<SDL::Error>))を発生させます。


    EXAMPLE
      # 前もって cdrom がオープンされたデバイスだと仮定 
      # CD 全体を再生 
      if cdrom.in_drive?
        cdrom.play_tracks 0, 0, 0, 0
      
      # 最初のトラックを再生 
      if cdrom.in_drive?
        cdrom.play_tracks 0, 0, 1, 0
      
      # 2 番目のトラックの最初から 15 秒を再生 
      if cdrom.in_drive?
        cdrom.play_tracks 1, 0, 0, SDL::CD::FPS*15

    * NOTES

      データトラックは無視されます。

    * See Also
      
      ((<SDL::CD#play>)), ((<SDL::CD#status>))

--- SDL::CD#pause

    指定された CD-ROM の再生を一時停止します。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * See Also
      
      ((<SDL::CD#play>)), ((<SDL::CD#resume>))

--- SDL::CD#resume

    指定した CD-ROM の再生を再開します。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * See Also
      
      ((<SDL::CD#play>)), ((<SDL::CD#pause>))

--- SDL::CD#stop

    指定された CD-ROM の再生を停止します。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * See Also
      
      ((<SDL::CD#play>))

--- SDL::CD#eject

    指定された CD-ROM を取り出します。

    失敗したときには例外((<SDL::Error>))を発生させます。

--- SDL::CD#num_tracks
--- SDL::CD#numTracks

    指定された CD-ROM のトラック数を返します。
    ((<SDL::CD#status>))で内容が更新されます。

    * See Also
      
      ((<SDL::CD#status>))

--- SDL::CD#current_track
--- SDL::CD#currentTrack

    指定された CD-ROM の現在のトラックを返します。
    ((<SDL::CD#status>))で内容が更新されます。

    * See Also
      
      ((<SDL::CD#status>))

--- SDL::CD#current_frame
--- SDL::CD#currentFrame

    指定された CD-ROM のトラック内の現在演奏しているフレームオフセット値を返します。
    ((<SDL::CD#status>))で内容が更新されます。

    * See Also
      
      ((<SDL::CD#status>))

--- SDL::CD#track_type(track)
--- SDL::CD#trackType(track)

    ((|track|)) で指定したトラックの種類を返します。
    SDL::CD::AUDIO_TRACK か SDL::CD::DATA_TRACK のいずれかを返します。

--- SDL::CD#track_length(track)
--- SDL::CD#trackLength(track)

    ((|track|)) で指定したトラックの長さをフレーム単位で返します。

--- SDL::CD#in_drive?

    ドライブにディスクがあるなら true を返します。

    * See Also
      
      ((<SDL::CD#status>))

--- SDL::CD.frames_to_msf(frames)
--- SDL::CD.framesToMSF(frames)

    フレーム数を分/秒/フレームに変換し、[分, 秒, フレーム] という整数3個の
    配列にして返します。

    * See Also
      
      ((<SDL::CD.msf_to_frames>))

--- SDL::CD.msf_to_frames(min, sec, frames)
--- SDL::CD.MSFToFrames(min, sec, frames)

    分/秒/フレームという値をフレーム数に変換します。

    * See Also
      
      ((<SDL::CD.frames_to_msf>))

= Audio
* ((<Audio 機能概説>))
* ((<利用可能な音楽/音声フォーマット>))
* ((<SDL::Mixer::Wave>))
* ((<SDL::Mixer::Music>))
* Audio関連メソッド
  * ((<SDL::Mixer.open>)) -- Audio関連APIの初期化をします。
  * ((<SDL::Mixer.spec>)) -- 初期化したデバイスが実際に使っているフォーマットを得ます。
  * ((<SDL::Mixer::Wave.load>)) -- ファイルから音声をロードする。
  * ((<SDL::Mixer::Wave.load_from_io>)) -- IOオブジェクトから音声をロードする。
  * ((<SDL::Mixer::Music.load>)) -- ファイルから音楽データをロードする。
  * ((<SDL::Mixer::Music.load_from_string>)) -- 文字列から音楽データをロードする。
  * ((<SDL::Mixer::Wave#set_volume>)) -- ボリュームを設定します。
  * ((<SDL::Mixer.allocate_channels>)) -- チャンネル数を設定します。
  * ((<SDL::Mixer.set_volume>)) -- 指定したチャンネルのボリュームを変更します。
  * ((<SDL::Mixer.play_channel>)) -- 指定したチャンネルで音声を再生します。
  * ((<SDL::Mixer.play_channel_timed>)) -- 指定したチャンネルで指定した時間だけ音声を再生します。
  * ((<SDL::Mixer.fade_in_channel>)) -- 指定したチャンネルで音声をフェイドインして再生します。
  * ((<SDL::Mixer.fade_in_channel_timed>)) -- 指定したチャンネルで音声をフェイドインして指定した時間だけ再生します。
  * ((<SDL::Mixer.pause>)) -- 指定したチャンネルの再生を一時停止します。
  * ((<SDL::Mixer.resume>)) -- 指定したチャンネルの再生を再開する。
  * ((<SDL::Mixer.halt>)) -- 指定したチャンネルの再生を止めます。
  * ((<SDL::Mixer.expire>)) -- 指定したミリ秒後に再生を停止します。
  * ((<SDL::Mixer.fade_out>)) -- 指定したチャンネルをフェードアウトします。
  * ((<SDL::Mixer.play?>)) -- 指定したチャンネルが再生中であるかどうかを得る。
  * ((<SDL::Mixer.pause?>)) -- 指定したチャンネルが一時停止中かどうかを得る。
  * ((<SDL::Mixer.fading>)) -- 指定したチャンネルがフェードイン/フェードアウトしているかどうかを得る
  * ((<SDL::Mixer.play_music>)) -- 音楽を演奏します。
  * ((<SDL::Mixer.fade_in_music>)) -- 音楽をフェードインして演奏します。
  * ((<SDL::Mixer.set_volume_music>)) -- 音楽演奏の音量を設定します。
  * ((<SDL::Mixer.pause_music>)) -- 音楽の演奏を一時停止します。
  * ((<SDL::Mixer.resume_music>)) -- 音楽の演奏を再開します。
  * ((<SDL::Mixer.rewind_music>)) -- 演奏位置を最初に移動します。
  * ((<SDL::Mixer.halt_music>)) -- 音楽の演奏を止めます。
  * ((<SDL::Mixer.fade_out_music>)) -- 音楽演奏をフェードアウトして停止します。
  * ((<SDL::Mixer.play_music?>)) -- 音楽が演奏中かどうかを得ます。
  * ((<SDL::Mixer.pause_music?>)) -- 音楽が一時停止中かどうかを得る。
  * ((<SDL::Mixer.fading_music>)) -- 音楽演奏のフェードイン/アウトの情報を得ます。

== Audio 機能概説
SDLはポータブルで低レベルなオーディオ出力機能を持っています。
低レベルな機能をRubyから直接利用するのは問題があるため、
Ruby/SDLでは高レベルな SDL_mixer ライブラリを経由した
音声出力機能のみ提供します。そのためオーディオ出力機能を利用するため
には SDL_mixer ライブラリをインストールする必要があります。

SDL_mixer ライブラリは一般的な需要に答えるため、
単純は複数チャンネル同時演奏ができる音声ミキシング機能を提供します。
16ビットステレオが8チャンネル音声出力と、
MOD/MIDI/MP3などによる音楽演奏1チャンネルが利用可能です。

このように音声出力と音楽演奏が分けられているのは、主に実装上の
理由です。「音声出力」が効果音、「音楽演奏」がBGMと考えれば良いでしょう。
音声には ((<SDL::Mixer::Wave>)) クラスが、音楽には ((<SDL::Mixer::Music>)) クラスが対応し
ています。

MIDIファイルの演奏はCPUに負荷をかけるため、普通のWAVEファイルは
ちゃんと聞こえるのに、MIDIファイルを演奏するとひどい音がする
ということがあります。
その場合は、8-bit出力やモノラル出力、低い周波数を試してください。

MIDIファイルを演奏するためには、
((<Timidity GUS Patches|URL:http://www.libsdl.org/projects/mixer/timidity/timidity.tar.gz>))
を適切な場所(UNIXでは /use/local/lib, Windowsでは C:\)に展開してください。

== 利用可能な音楽/音声フォーマット

Ruby/SDL では以下の音楽/音声フォーマットが利用可能です。
* WAVE/RIFF (.wav)
* AIFF (.aiff)
* VOC (.voc)
* MOD (.mod .xm .s3m .669 .it .med など)
* MIDI (.mod) timidity利用もしくはMIDIハードウェアを利用
* OggVorbis (.ogg) ogg/vorbis ライブラリが必要
* MP3 (.mp3) SMPEG ライブラリが必要

== SDL::Mixer
audio関連のクラスや関数を持つモジュールです。

== SDL::Mixer::Wave
複数チャンネルによる合成が可能な音声データを表わすクラスです。
WAVE,  AIFF, RIFF, OGG, VOC に対応しています。

== SDL::Mixer::Music
音楽データを表わすクラスです。
WAVE, MOD, MIDI, OGG, MP3 に対応しています。

== Audio関連メソッド

--- SDL::Mixer.open(frequency=Mixer::DEFAULT_FREQUENCY,format=Mixer::DEFAULT_FORMAT,cannels=Mixer::DEFAULT_CHANNELS,chunksize=4096)

    Audio関連APIの初期化をします。他のAudio関連のメソッドを呼ぶ前にこれを
    呼ぶ必要があります。またこれを呼ぶ前に((<SDL.init>))(SDL::INIT_AUDIO)を呼ば
    なくてはなりません。
    CDと同じ44.1KHzのサンプリングレートを使いたいときは ((|frequency|)) として
    44100を与えてください。44100では古いコンピュータではCPUパワーを使いすぎる
    のでゲームではたいてい22050を使います。
    定数 Mixer::DEFAULT_FREQUENCY はこの 22050 を表わします。
    ((|chunksize|)) はそれぞれのチャンネルに割当てられるメモリの量(byte単位)です。
    遅いコンピュータ上で ((|chunksize|)) を小さくすると、音が途切れる可能性が
    あります。また、((|chunksize|)) を大きくしすぎると、効果音の発生が遅延します。
    対象のコンピュータに合わせてちょうどよい値を設定してください。
    単に音楽を演奏したいだけなら、4096以上にしておけば良いでしょう。
    デフォルトでは8(定数Mixer::CHANNELS)チャンネルが確保されます。
    
    ((|format|)) は以下のものが利用できます。
    :SDL::Mixer::AUDIO_U8
        Unsigned 8-bit samples
    :SDL::Mixer::AUDIO_S8
        Signed 8-bit samples
    :SDL::Mixer::AUDIO_U16LSB
        Unsigned 16-bit samples, in little-endian byte order
    :SDL::Mixer::AUDIO_S16LSB
        Signed 16-bit samples, in little-endian byte order
    :SDL::Mixer::AUDIO_U16MSB
        Unsigned 16-bit samples, in big-endian byte order
    :SDL::Mixer::AUDIO_S16MSB
        Signed 16-bit samples, in big-endian byte order
    :SDL::Mixer::AUDIO_U16
        same as AUDIO_U16LSB (for backwards compatability probably)
    :SDL::Mixer::AUDIO_S16
        same as AUDIO_S16LSB (for backwards compatability probably)
    :SDL::Mixer::AUDIO_U16SYS
        Unsigned 16-bit samples, in system byte order
    :SDL::Mixer::AUDIO_S16SYS
        Signed 16-bit samples, in system byte order
    
    SDL::DEFAULT_FORMAT は SDL::Mixer::AUDIO_S16SYS を指します。
    
    ((|channels|)) は 1 でモノラル、2でステレオ出力を指定します。
    Mixer::DEFAULT_CHANNELS は 2 です。

    失敗したときには例外((<SDL::Error>))を発生させます。


    EXAMPLE
      # SDLを初期化、Audio機能を有効にする。
      SDL.init(SDL::INIT_AUDIO)
      # 44.1KHz, signed 16bit, system byte order, ステレオ出力、
      # 1024 byte チャンクサイズ
      SDL::Mixer.open(44100, SDL::Mixer::DEFAULT_FORMAT, 2, 1024)

    * See Also
      
      ((<SDL::Mixer.spec>)), ((<SDL::Mixer.allocate_channels>))

--- SDL::Mixer.spec

    初期化したデバイスが実際に使っているフォーマットを得ます。これは
    ((<SDL::Mixer.open>)) に与えたパラメータと同じ場合もありますし違う場合もあります。
    返り値は [frequency, format, channels] という配列です。詳しい意味は
    ((<SDL::Mixer.open>)) を参照してください。

    失敗したときには例外((<SDL::Error>))を発生させます。


    EXAMPLE
      frequency, format, channels = SDL::Mixer.spec
      format_str = case format
      when SDL::Mixer::AUDIO_U8 then "U8"
      when SDL::Mixer::AUDIO_S8 then "S8"
      when SDL::Mixer::AUDIO_U16LSB then "U16LSB"
      when SDL::Mixer::AUDIO_S16LSB then "S16LSB"
      when SDL::Mixer::AUDIO_U16MSB then "U16MSB"
      when SDL::Mixer::AUDIO_S16MSB then "S16MSB"
      end
      
      printf "frequency=%dHz format=%s channels=%d", frequency, format_str, channels

    * See Also
      
      ((<SDL::Mixer.open>))

--- SDL::Mixer::Wave.load(filename)

    ((|filename|)) から音声をロードします。
    WAVE, AIFF, RIFF, OGG, VOC に対応しています。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * NOTES

      これを呼ぶ前に ((<SDL::Mixer.open>)) を呼んでおく必要があります。
      
      OGGをロードした場合、ロード時にすべてのデータがメモリ上にRAWデータとして
      展開されるので、メモリ使用量に注意してください。

--- SDL::Mixer::Wave.load_from_io(io)
--- SDL::Mixer::Wave.loadFromIO(io)

    ((|io|))から音声をロードします。((|io|))にはRubyのIOオブジェクト
    (IO, StringIOなどread, tell, rewindを持つオブジェクト)を指定します。
    WAVE, AIFF, RIFF, OGG, VOC に対応しています。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * NOTES

      これを呼ぶ前に ((<SDL::Mixer.open>)) を呼んでおく必要があります。
      
      OGGをロードした場合、ロード時にすべてのデータがメモリ上にRAWデータとして
      展開されるので、メモリ使用量に注意してください。

--- SDL::Mixer::Music.load(filename)

    ((|filename|)) から音楽データをロードします。
    WAVE, MOD, MIDI, OGG, MP3 に対応しています。

    失敗したときには例外((<SDL::Error>))を発生させます。

--- SDL::Mixer::Music.load_from_string(str)
--- SDL::Mixer::Music.loadFromString(str)

    ((|str|))から音楽データをロードします。((|str|))には音楽データのバイナリ文字列
    を与えます。
    MOD, OGG に対応しています。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * NOTES

      内部的に ((|str|)) をコピーして別に保持しているため、メモリの使用量に
      注意してください。

--- SDL::Mixer::Wave#set_volume(volume)
--- SDL::Mixer::Wave#setVolume(volume)

    ボリュームを ((|volume|)) に設定します。ボリュームは 0 から 128 までの
    値を指定します。

--- SDL::Mixer.allocate_channels(num_channels)
--- SDL::Mixer.allocateChannels(num_channels)

    ミキシングするチャンネル数を設定します。この関数は何度呼んでもかまいません。
    音声再生中に呼んでもかまいません。もし新たなチャンネル数が以前のものより
    小さいならば、大きいほうのチャンネルは再生を停止し、リソースを解放し、
    ミキシングされなくなります。1秒間に1000回もチャンネル数を変更させるような
    ことはしないほうがよいでしょう。

    確保したチャンネル数を返します。


    EXAMPLE
      # 16チャンネル確保
      SDL::Mixer.allocate_channels(16)

    * NOTES

      もし ((|num_channels|)) に 0 を与えたならば、たとえ再生中でも
      すべてのチャンネルを解放してしまいます。

--- SDL::Mixer.set_volume(channel, volume)
--- SDL::Mixer.setVolume(channel, volume)

    ((|channel|)) で指定したチャンネルのボリュームを ((|volume|)) に設定します。
    ((|channel|)) に -1 を指定した場合はすべてのチャンネルのボリュームを
    一度に変更します。このボリュームは最終ミキシング時に適用されるものであり、
    ((<SDL::Wave#set_volume>)) で指定したものとは独立に作用します。つまり指定したチャンネル
    で再生する音をすべて半分の大きさにしたい場合は、 ((|volume|)) として64を指定
    してください。すべてのチャンネルはデフォルトでは音量は 128、 つまり最大
    の値に設定されています。((<SDL::Mixer.allocate_channels>)) で新たに確保された
    チャンネルの音量は 128 に設定されます。そのため ((|volume|)) に -1 を指定して
    すべてのチャンネルの音量を変更した後、新たなチャンネルを確保すると、
    そのチャンネルは音量変更の効果を受けません。

    現在のボリュームを返します。((|channel|)) として -1 を与えた場合は
    すべてのチャンネルの平均を返します。

    * See Also
      
      ((<SDL::Mixer::Wave#set_volume>)), ((<SDL::Mixer.set_volume_music>))

--- SDL::Mixer.play_channel(channel, wave, loops)
--- SDL::Mixer.playChannel(channel, wave, loops)

    ((|channel|)) で指定したチャンネルで ((|wave|)) で指定した音声(((<SDL::Mixer::Wave>))
    のインスタンス)を再生します。 ((|channel|)) に -1 を指定した場合は使われていない
    チャンネルの中で一番若いものが使われます。((|loops|)) + 1 回繰り返し演奏されます。
    ((|loops|)) に -1 を指定すると無限に繰り返します。

    どのチャンネルを使って再生したかを整数で返します。


    EXAMPLE
      # 使われていないチャンネルを使って sample を再生する
      # 繰り返しはしない
      SDL::Mixer.play_channel(-1, sample, 0)

    * See Also
      
      ((<SDL::Mixer.play_channel_timed>)), ((<SDL::Mixer.fade_in_channel>)), ((<SDL::Mixer.halt>)), ((<SDL::Mixer.expire>))

--- SDL::Mixer.play_channel_timed(channel, wave, loops, ticks)
--- SDL::Mixer.playChannelTimed(channel, wave, loops, ticks)

    ((|wave|)) が十分長い、もしくは ((|loops|)) が十分大きい場合に
    ((|ticks|)) ミリ秒だけ再生します。
    他は ((<SDL::Mixer.play_channel>)) と同じです。


    EXAMPLE
      # 使われていないチャンネルを使って sample を 1/2秒再生する
      SDL::Mixer.play_channel(-1, sample, -1, 500)

    * See Also
      
      ((<SDL::Mixer.play_channel>)), ((<SDL::Mixer.fade_in_channel_timed>)), ((<SDL::Mixer.fade_out>)), ((<SDL::Mixer.halt>)), ((<SDL::Mixer.expire>))

--- SDL::Mixer.fade_in_channel(channel, wave, loops, ms)
--- SDL::Mixer.fadeInChannel(channel, wave, loops, ms)

    指定したチャンネルで音声をフェイドインして再生します。
    ((|ms|)) ミリ秒かけてフェイドイン再生する点以外は ((<SDL::Mixer.play_channel>)) と
    同じです。


    EXAMPLE
      # 使われていないチャンネルを使って
      # sample を1秒かけてフェードインして3回再生する
      SDL::Mixer.fade_in_channel(-1, sample, 2, 1000)

    * See Also
      
      ((<SDL::Mixer.play_channel>)), ((<SDL::Mixer.fade_in_channel_timed>)), ((<SDL::Mixer.fading>)), ((<SDL::Mixer.fade_out>)), ((<SDL::Mixer.halt>)), ((<SDL::Mixer.expire>))

--- SDL::Mixer.fade_in_channel_timed(channel, wave, loops, ms, ticks)
--- SDL::Mixer.fadeInChannelTimed(channel, wave, loops, ms, ticks)

    指定したチャンネルで音声をフェイドインして指定した時間だけ再生します。
    ((|ms|)) ミリ秒かけてフェイドイン再生する点以外は ((<SDL::Mixer.play_channel_timed>)) と
    同じです。

    * See Also
      
      ((<SDL::Mixer.play_channel_timed>)), ((<SDL::Mixer.fade_in_channel>)), ((<SDL::Mixer.fading>)), ((<SDL::Mixer.fade_out>)), ((<SDL::Mixer.halt>)), ((<SDL::Mixer.expire>))

--- SDL::Mixer.pause(channel)

    ((|channel|)) で指定したチャンネルの再生を一時停止します。
    ((|channel|)) に -1 を指定するとすべてのチャンネルを停止します。
    これで一時停止したチャンネルを ((<SDL::Mixer.halt>)) で完全に停止してもかま
    いません。


    EXAMPLE
      # すべての音声再生を停止する
      SDL::Mixer.pause(-1)

    * See Also
      
      ((<SDL::Mixer.resume>)), ((<SDL::Mixer.pause?>)), ((<SDL::Mixer.halt>))

--- SDL::Mixer.resume(channel)

    ((<SDL::Mixer.pause>)) で再生を停止していたチャンネルの再生を再開します。
    ((|channel|)) で再開するチャンネルを指定します。-1 を与えると
    すべてのチャンネルで再開します。

    * See Also
      
      ((<SDL::Mixer.pause>)), ((<SDL::Mixer.pause?>))

--- SDL::Mixer.halt(channel)

    ((|channel|)) で指定したチャンネルの再生を止めます。-1を与えた場合は
    すべてのチャンネルの再生を止めます。

    * See Also
      
      ((<SDL::Mixer.expire>)), ((<SDL::Mixer.fade_out>))

--- SDL::Mixer.expire(channel, ticks)

    ((|ticks|)) ミリ秒後に、((|channel|)) で指定したチャンネルの再生を停止します。
    ((|channel|)) に -1 を与えるとすべてのチャンネルを停止します

    停止するチャンネルの数を返します。


    EXAMPLE
      # 2秒後に全てのチャンネルの再生を停止する
      SDL::Mixer.expire(-1, 2000)

    * See Also
      
      ((<SDL::Mixer.halt>)), ((<SDL::Mixer.fade_out>))

--- SDL::Mixer.fade_out(channel, ms)
--- SDL::Mixer.fadeOut(channel, ms)

    この関数を呼んだ時点から ((|ms|)) ミリ秒かけて ((|channel|)) をフェードアウトします。
    フェードアウトが完了したらそのチャンネルは再生を停止します。
    また、((|channel|)) に-1を渡すとすべてのチャンネルをフェードアウトします。
    再生中のチャンネルしか影響を及ぼしませんが、一時停止中のものも
    影響を受けます。

    フェードアウトするチャンネルの数を返します。


    EXAMPLE
      # すべてのチャンネルを3秒でフェードアウトする
      printf "starting fade out of %d channels", SDL::Mixer.fade_out(-1, 3000)

    * See Also
      
      ((<SDL::Mixer.fade_in_channel>)), ((<SDL::Mixer.fade_in_channel_timed>)), ((<SDL::Mixer.fading>))

--- SDL::Mixer.play?(channel)

    ((|channel|)) で指定したチャンネルが再生中であるなら
    true を、なければ false を返す。

    * See Also
      
      ((<SDL::Mixer.pause?>)), ((<SDL::Mixer.fading>)), ((<SDL::Mixer.play_channel>)), ((<SDL::Mixer.pause>))

--- SDL::Mixer.pause?(channel)

    指定したチャンネルが一時停止中なら真を、なければ偽を返す。

    * See Also
      
      ((<SDL::Mixer.play?>)), ((<SDL::Mixer.pause>)), ((<SDL::Mixer.resume>))

--- SDL::Mixer.fading(which)

    指定したチャンネルがフェードアウトしているなら SDL::Mixer::FADING_OUT を、
    フェードインしている最中なら SDL::Mixer::FADING_IN を、
    どちらでもなければ SDL::Mixer::NO_FADING を返す。

    * See Also
      
      ((<SDL::Mixer.play?>)), ((<SDL::Mixer.pause?>)), ((<SDL::Mixer.fade_in_channel>)), ((<SDL::Mixer.fade_in_channel_timed>)), ((<SDL::Mixer.fade_out>))

--- SDL::Mixer.play_music(music, loops)
--- SDL::Mixer.playMusic(music, loops)

    ((|music|)) で指定した音楽を
    ((|loop|)) 回最初から最後まで演奏します。((|loops|)) に -1 を指定すると
    永遠に演奏を繰り返します。
    前に演奏していていた音楽は演奏を停止します。フェードアウトの最中にある
    場合はフェードアウトが終わってから次のを演奏します。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * See Also
      
      ((<SDL::Mixer.fade_in_music>))

--- SDL::Mixer.fade_in_music(music, loops, ms)
--- SDL::Mixer.fadeInMusic(music, loops, ms)

    ((|music|)) で指定した音楽を ((|ms|)) ミリ秒かけてフェードインして演奏を開始します。
    ((|loops|)) 回繰り返し演奏します。-1 を与えると永遠に繰り返します。
    繰り返しの最初の1回目のみフェードインします。
    その時点で演奏していた曲は停止します。フェードアウトの最中にある
    場合はフェードアウトが終わってから次のを演奏します。

    失敗したときには例外((<SDL::Error>))を発生させます。

    * See Also
      
      ((<SDL::Mixer.play_music>))

--- SDL::Mixer.set_volume_music(volume)
--- SDL::Mixer.setVolumeMusic(volume)

    音楽演奏の音量を ((|volume|)) に設定します。0 が最小で 128 が最大です。
    フェードイン/アウト中にこのモジュール関数を呼んでも効果がありません。
    なぜならフェードイン/アウトを実現するためにこれを使っているからです。

    * See Also
      
      ((<SDL::Mixer.fade_in_music>)), ((<SDL::Mixer.fade_out_music>))

--- SDL::Mixer.pause_music
--- SDL::Mixer.pauseMusic

    音楽の演奏を一時停止します。時停止中でも ((<SDL::Mixer.halt_music>)) で
    演奏を止めることができます。

    * See Also
      
      ((<SDL::Mixer.resume_music>)), ((<SDL::Mixer.pause_music?>)), ((<SDL::Mixer.halt_music>))

--- SDL::Mixer.resume_music
--- SDL::Mixer.resumeMusic

    ((<SDL::Mixer.pause_music>)) で一時停止している音楽を再開します。

    * See Also
      
      ((<SDL::Mixer.pause_music>)), ((<SDL::Mixer.pause_music?>))

--- SDL::Mixer.rewind_music
--- SDL::Mixer.rewindMusic

    演奏位置を最初に移動します。音楽が演奏中、停止中、一時停止中、いずれの
    場合に呼んでも問題ありません。
    
    このモジュール関数は MOD, OGG, MP3, Native MIDI の場合のみに
    使えます。

--- SDL::Mixer.halt_music
--- SDL::Mixer.haltMusic

    音楽の演奏を止めます。
    フェードイン/アウト中でもすぐ停止します。

    * See Also
      
      ((<SDL::Mixer.fade_out_music>))

--- SDL::Mixer.fade_out_music(ms)
--- SDL::Mixer.fadeOutMusic(ms)

    音楽演奏を ((|ms|)) ミリ秒かけてフェードアウトして停止します。
    一時停止中の場合にも効果があります。

--- SDL::Mixer.play_music?
--- SDL::Mixer.playMusic?

    音楽が演奏中なら真を、なければ偽を返します。

    * See Also
      
      ((<SDL::Mixer.pause_music?>)), ((<SDL::Mixer.fading_music>)), ((<SDL::Mixer.play_music>))

--- SDL::Mixer.pause_music?
--- SDL::Mixer.pauseMusic?

    一時停止中なら true を、なければ false を返す。

    * See Also
      
      ((<SDL::Mixer.play_music?>)), ((<SDL::Mixer.pause_music>)), ((<SDL::Mixer.resume_music>))

--- SDL::Mixer.fading_music
--- SDL::Mixer.fadingMusic

    音楽演奏がフェードアウトしているなら SDL::Mixer::FADING_OUT を、
    フェードインしている最中なら SDL::Mixer::FADING_IN を、
    どちらでもなければ SDL::Mixer::NO_FADING を返す。

    * See Also
      
      ((<SDL::Mixer.fading>)), ((<SDL::Mixer.pause_music?>)), ((<SDL::Mixer.play_music?>)), ((<SDL::Mixer.fade_out_music>))

= Time
  * ((<SDL.get_ticks>)) -- SDLライブラリの初期化からの経過ミリ秒数を取得します。
  * ((<SDL.delay>)) -- 指定されたミリ秒間停止して復帰します。
DLは時間を扱うクロスプラットフォームな方法をいくつか提供しています。
提供しているものは現在の時間を得る方法と短時間待つ方法です。

==Methods

--- SDL.get_ticks
--- SDL.getTicks

    SDLライブラリが初期化されてからのミリ秒数を得ることができます。
    プログラムが49日間以上
    実行される場合にはこの値は戻ってしまう(wrap)ことに注意して下さい。

    * See Also
      
      ((<SDL.delay>))

--- SDL.delay(ms)

    指定されたミリ秒間停止して復帰します。このモジュール関数は
    ((*少くとも*))指定されたミリ秒間停止します。
    しかしOSのスケジューリングによってはもっと長くなることもあります。

    * NOTES

      ((*少くとも*))10ミリ秒の遅延を考えて下さい。
      プラットフォームによってはもっと短かい時間の場合もありますが、
      この値が最も一般的です。
      
      この関数を使って停止している間は Ruby のスレッドは切り替わりません。
      Kernel#sleep を使ったほうが良いでしょう。

= Font
* ((< Font描画機能概説>))
* ((<SDL::TTF>))
* ((<SDL::BMFont>))
* ((<SDL::Kanji>))
* フォント関連メソッド
  * ((<SDL::TTF.init>)) -- TTF描画機能を初期化します。
  * ((<SDL::TTF.init?>)) -- TTF描画機能が初期化されているかどうかを得ます。
  * ((<SDL::TTF.open>)) -- ファイルからフォントを読みこみます。
  * ((<SDL::TTF#style>)) -- フォントの描画スタイルを返します。
  * ((<SDL::TTF#style=>)) -- フォントの描画スタイルを設定します。
  * ((<SDL::TTF#height>)) -- フォントの文字の高さを返します。
  * ((<SDL::TTF#ascent>)) -- フォントのascentを返します。
  * ((<SDL::TTF#descent>)) -- フォントのdescentを返します。
  * ((<SDL::TTF#line_skip>)) -- フォントの一行あたりの推奨高さを返す。
  * ((<SDL::TTF#faces>)) -- フェイスの数を返します。
  * ((<SDL::TTF#fixed_width?>)) -- フォントフェイスが等幅かどうかを得ます。
  * ((<SDL::TTF#family_name>)) -- フォントの現在のフェイスの名前を得ます。
  * ((<SDL::TTF#style_name>)) -- フォントの現在のフェイスのスタイルの名前を得ます。
  * ((<SDL::TTF#size_text>)) -- 文字列のレンダリングに必要なサーフェスのサイズを得ます。
  * ((<SDL::TTF#render_solid_utf8>)) -- 文字列をレンダリングしたサーフェスを返します。
  * ((<SDL::TTF#render_shaded_utf8>)) -- 文字列をアンチエイリアシングしてレンダリングしたサーフェスを返します。
  * ((<SDL::TTF#render_blended_utf8>)) -- 文字列をアルファを使ってアンチエイリアスしたサーフェスを返します。
  * ((<SDL::TTF#draw_solid_utf8>)) -- 文字列を描画します。
  * ((<SDL::TTF#draw_shaded_utf8>)) -- 文字列をアンチエイリアス描画します。
  * ((<SDL::TTF#draw_blended_utf8>)) -- 文字列をアルファでアンチエイリアスして描画します。
  * ((<SDL::BMFont.open>)) -- フォントをロードします。
  * ((<SDL::BMFont#set_color>)) -- フォントの色を変更します。
  * ((<SDL::BMFont#height>)) -- フォントの高さを得ます。
  * ((<SDL::BMFont#width>)) -- フォントの幅を得ます。
  * ((<SDL::BMFont#text_size>)) -- 文字列の描画に必要なサーフェスの大きさを得ます。
  * ((<SDL::BMFont#textout>)) -- 文字列を描画します。
  * ((<SDL::Kanji.open>)) -- bdfファイルを読み込む。
  * ((<SDL::Kanji#add>)) -- 既に読み込んでいるフォントに追加してフォントを読みこみます。
  * ((<SDL::Kanji#set_coding_system>)) -- 文字コードを指定します。
  * ((<SDL::Kanji#height>)) -- 文字の高さを得ます。
  * ((<SDL::Kanji#textwidth>)) -- 文字列の幅を得ます。
  * ((<SDL::Kanji#width>)) -- 文字の幅を得ます。
  * ((<SDL::Kanji#put>)) -- 文字を描画します。
  * ((<SDL::Kanji#put_tate>)) -- 文字を縦書きで描画します。

== Font描画機能概説
Ruby/SDL は3種類の異なるフォント描画システムを持っています。
((<SDL_ttf|URL:http://www.libsdl.org/projects/SDL_ttf/index.html>))
での True Type Font の描画、
((<SGE|URL:http://www.etek.chalmers.se/~e8cal1/sge/index.html>))
での独自形式/SFont形式でのビットマップフォントの描画、
((<SDL_kanji|URL:http://shinh.skr.jp/sdlkanji/>)) での bdf フォントの描画
です。
このそれぞれに、((<SDL::TTF>))、((<SDL::BMFont>))、((<SDL::Kanji>)) というクラスが割当てられて
いて、それぞれ異なるメソッド、機能を持ちます。

これにはそれぞれ以下のような特徴があります。適切に使いわけてください。
* SDL::TTF

  フォントファイルの名前は *.ttf や *.ttc が一般的です。
  フォントデータの情報がベクトルデータであるため、一つの
  フォントデータがあれば任意の大きさの文字を描画できる利点があります。
  フォントデータを準備するのが面倒という欠点です。とくに自作
  するのは大変でしょう。

* SDL::BMFont

  フォントファイルはたんなるビットマップファイル(*.bmp) や PNG ファイル(*.png)
  を使います。独自形式の場合、画像を等幅の文字データを横に256個並べたものと
  みなし、そのそれぞれが ASCII コードと対応しているもとの解釈されます。
  つまり 横幅 8 ピクセル、高さ 16ピクセルのデータならば
  幅 8*256 = 2048、高さ 16ピクセルの画像となります。
  フォントデータを自作するのが比較的容易なことが利点です。
  平仮名、漢字等の描画ができないこと、拡大縮小した文字を
  描画できないことが欠点です。

  もう一つ、このクラスは ((<SFont|URL:http://www.linux-games.com/sfont/>))
  形式も扱うことができます。これもビットマップフォントの一種ですが、
  文字の幅が可変である点などが利点です。詳しくはリンク先を見てください。
  
* SDL::Kanji

  フォントファイルの拡張子にはbdfが使われます。ビットマップフォントの
  一種です。複数のフォントファイル(例えばアルファベットと日本語)
  のデータを併せて使う機能を持っています。
  平仮名、漢字等の描画が可能な点が利点です。
  欠点は、bdf フォントはあまり一般的な形式ではないためフォントの用意が
  面倒であることです。

== SDL::TTF
* ((<SDL::TTF.init>)) -- TTF描画機能を初期化します。
* ((<SDL::TTF.init?>)) -- TTF描画機能が初期化されているかどうかを得ます。
* ((<SDL::TTF.open>)) -- ファイルからフォントを読みこみます。
* ((<SDL::TTF#style>)) -- フォントの描画スタイルを返します。
* ((<SDL::TTF#style=>)) -- フォントの描画スタイルを設定します。
* ((<SDL::TTF#height>)) -- フォントの文字の高さを返します。
* ((<SDL::TTF#ascent>)) -- フォントのascentを返します。
* ((<SDL::TTF#descent>)) -- フォントのdescentを返します。
* ((<SDL::TTF#line_skip>)) -- フォントの一行あたりの推奨高さを返す。
* ((<SDL::TTF#faces>)) -- フェイスの数を返します。
* ((<SDL::TTF#fixed_width?>)) -- フォントフェイスが等幅かどうかを得ます。
* ((<SDL::TTF#family_name>)) -- フォントの現在のフェイスの名前を得ます。
* ((<SDL::TTF#style_name>)) -- フォントの現在のフェイスのスタイルの名前を得ます。
* ((<SDL::TTF#size_text>)) -- 文字列のレンダリングに必要なサーフェスのサイズを得ます。
* ((<SDL::TTF#render_solid_utf8>)) -- 文字列をレンダリングしたサーフェスを返します。
* ((<SDL::TTF#render_shaded_utf8>)) -- 文字列をアンチエイリアシングしてレンダリングしたサーフェスを返します。
* ((<SDL::TTF#render_blended_utf8>)) -- 文字列をアルファを使ってアンチエイリアスしたサーフェスを返します。
* ((<SDL::TTF#draw_solid_utf8>)) -- 文字列を描画します。
* ((<SDL::TTF#draw_shaded_utf8>)) -- 文字列をアンチエイリアス描画します。
* ((<SDL::TTF#draw_blended_utf8>)) -- 文字列をアルファでアンチエイリアスして描画します。

TrueTypeFontを表わすクラスです。このクラスを使うためには、
((<SDL_ttf|URL:http://www.libsdl.org/projects/SDL_ttf/index.html>))
が必要です。バックエンドに((<Freetype|URL:http://www.freetype.org/>))
を利用します。

また、フォントのライセンスにも注意してください。例えば Windows 付属の
フォントは再配布が認められていません。

== SDL::BMFont
* ((<SDL::BMFont.open>)) -- フォントをロードします。
* ((<SDL::BMFont#set_color>)) -- フォントの色を変更します。
* ((<SDL::BMFont#height>)) -- フォントの高さを得ます。
* ((<SDL::BMFont#width>)) -- フォントの幅を得ます。
* ((<SDL::BMFont#text_size>)) -- 文字列の描画に必要なサーフェスの大きさを得ます。
* ((<SDL::BMFont#textout>)) -- 文字列を描画します。

ビットマップフォントを表わすクラスです。このクラスを使うためには
((<SGE|URL:http://www.etek.chalmers.se/~e8cal1/sge/index.html>))
が必要です。

== SDL::Kanji
* ((<SDL::Kanji.open>)) -- bdfファイルを読み込む。
* ((<SDL::Kanji#add>)) -- 既に読み込んでいるフォントに追加してフォントを読みこみます。
* ((<SDL::Kanji#set_coding_system>)) -- 文字コードを指定します。
* ((<SDL::Kanji#height>)) -- 文字の高さを得ます。
* ((<SDL::Kanji#textwidth>)) -- 文字列の幅を得ます。
* ((<SDL::Kanji#width>)) -- 文字の幅を得ます。
* ((<SDL::Kanji#put>)) -- 文字を描画します。
* ((<SDL::Kanji#put_tate>)) -- 文字を縦書きで描画します。

bdfフォントを表わすクラスです。

== フォント関連メソッド

--- SDL::TTF.init

    TTF描画機能を初期化します。
    ((<SDL::TTF>)) の他のメソッドを呼ぶ前にこれを呼んでください。
    ((<SDL.init>)) を呼ぶ前に呼んでもかまいません。


    このメソッドを使うには SDL_ttf が必要です。
    * See Also
      
      ((<SDL::TTF.init?>))

--- SDL::TTF.init?

    TTF描画機能が既に初期化されていればtrueを、いなければ
    falseを返します。


    このメソッドを使うには SDL_ttf が必要です。
    * See Also
      
      ((<SDL::TTF.init>))

--- SDL::TTF.open(filename, ptsize, index=nil)

    ((|filename|)) で指定したフォントファイルを ((|ptsize|)) ポイント
    で読み込みます。((|index|)) で face index を指定できます。
    デフォルトでは 0 です。

    ((<SDL::TTF>)) のインスタンスを返します。

    失敗したときには例外((<SDL::Error>))を発生させます。


    このメソッドを使うには SDL_ttf が必要です。

    EXAMPLE
      SDL::TTF.init
      font = SDL::TTF.open("font.ttf", 32, 0)

--- SDL::TTF#style

    フォント ((|self|)) の描画スタイルを以下の値の論理和をとったもので返します。
    * SDL::TTF::STYLE_BOLD
    * SDL::TTF::STYLE_ITALIC
    * SDL::TTF::STYLE_UNDERLINE
    以上のどれも設定されていない場合は SDL::TTF::STYLE_NORMAL が返されます。


    このメソッドを使うには SDL_ttf が必要です。

    EXAMPLE
      print "The font style is:"
      
      print " normal" if font.style == SDL::TTF::STYLE_NORMAL
      print " bold" if (font.style & SDL::TTF::STYLE_BOLD) != 0
      print " italic" if (font.style & SDL::TTF::STYLE_ITALIC) != 0
      print " italic" if (font.style & SDL::TTF::STYLE_UNDERLINE) != 0
      
      print "\n"

    * See Also
      
      ((<SDL::TTF#style=>))

--- SDL::TTF#style=(new_style)

    フォント ((|self|)) の描画スタイルを ((|new_style|)) に設定します。
    ((|new_style|)) は以下の定数の論理和を与えてください。
    * SDL::TTF::STYLE_BOLD
    * SDL::TTF::STYLE_ITALIC
    * SDL::TTF::STYLE_UNDERLINE


    このメソッドを使うには SDL_ttf が必要です。

    EXAMPLE
      # イタリック体かつボールド体に設定する
      font.style = SDL::TTF::STYLE_ITALIC | SDL::TTF::STYLE_BOLD
      
      # 描画する…
      
      # 通常に戻す
      font.style = SDL::TTF::STYLE_NORMAL

    * NOTES

      このメソッドを呼ぶと内部のレンダリング済み文字のキャッシュが
      消されます。

    * See Also
      
      ((<SDL::TTF#style>))

--- SDL::TTF#height

    フォントの文字の中で一番縦の高さが高いものの高さをピクセル数で返します。
    この値を文字を縦にできるだけ近づけて描画するために使えます。その場合は
    この値に1を足せば文字同士が触れなくなります。
    Ruby/SDLは複数行描画を考慮していないため、行間をきちんと取るのは
    自分でしなければなりません。((<SDL::TTF#line_skip>)) も参考にしてください。


    このメソッドを使うには SDL_ttf が必要です。
--- SDL::TTF#ascent

    文字のascent(ベースラインからの上の部分の高さ)の最大値を返します。
    つまり文字の上端からベースラインまでの距離です。


    このメソッドを使うには SDL_ttf が必要です。
    * See Also
      
      ((<SDL::TTF#height>)), ((<SDL::TTF#descent>)), ((<SDL::TTF#line_skip>))

--- SDL::TTF#descent

    文字のdescent(ベースラインから下の部分の高さ)の最大値を返します。
    つまり文字の下端からベースラインまでの距離です。


    このメソッドを使うには SDL_ttf が必要です。
    * See Also
      
      ((<SDL::TTF#height>)), ((<SDL::TTF#ascent>)), ((<SDL::TTF#line_skip>))

--- SDL::TTF#line_skip

    そのフォントに一行あたり何ピクセルの高さを割当てるべきかを
    返します。複数行描画したい場合には ((<SDL::TTF#height>)) の値より
    こちらの値を使ったほうが良いかもしれません。
    この値は通常 ((<SDL::TTF#height>)) の値より大きいです。


    このメソッドを使うには SDL_ttf が必要です。
    * See Also
      
      ((<SDL::TTF#height>)), ((<SDL::TTF#ascent>)), ((<SDL::TTF#descent>))

--- SDL::TTF#faces

    フォントに含まれる利用可能なフェイス(「サブフォント」)の数を返します。
    通常この値は利用価値はないでしょう、というのはこの値は ((<SDL::TTF>)) の他の
    メソッドになんら影響を与えないからです。


    このメソッドを使うには SDL_ttf が必要です。
--- SDL::TTF#fixed_width?

    ((|self|)) が等幅であれば true を、なければ false を返す。
    等幅フォントはすべての文字が同じであり、文字列をレンダリングした結果
    のサーフェスの幅は単に「文字の幅 * 文字列の長さ」になります。


    このメソッドを使うには SDL_ttf が必要です。
    * See Also
      
      ((<SDL::TTF#faces>)), ((<SDL::TTF#family_name>))

--- SDL::TTF#family_name
--- SDL::TTF#familyName

    ((|self|)) の現在のフォントフェイスの名前を返します。
    名前情報が無い場合は nil を返します。


    このメソッドを使うには SDL_ttf が必要です。
    * See Also
      
      ((<SDL::TTF#faces>)), ((<SDL::TTF#fixed_width?>)), ((<SDL::TTF#style_name>))

--- SDL::TTF#style_name
--- SDL::TTF#styleName

    ((|self|)) の現在のフォントフェイスのスタイルの名前を返します。
    名前情報が無い場合は nil を返します。


    このメソッドを使うには SDL_ttf が必要です。
    * See Also
      
      ((<SDL::TTF#faces>)), ((<SDL::TTF#fixed_width?>)), ((<SDL::TTF#family_name>))

--- SDL::TTF#size_text(text)
--- SDL::TTF#sizeText(text)

    ((|text|)) で与えられた文字列をレンダリングするのに必要な((<サーフェス|SDL::Surface>))
    のサイズを計算し、その幅、高さを返します。((|text|)) のエンコーディングは
    UTF8でなければなりません。
    実際には一切レンダリングされませんが、カーニングの影響を考慮した幅が
    得られます。
    高さは ((<SDL::TTF#height>)) と同じ値が得られます。

    失敗したときには例外((<SDL::Error>))を発生させます。


    このメソッドを使うには SDL_ttf が必要です。

    EXAMPLE
      w, h = font.size_text("Hello World!")
      puts "width=#{w} height=#{h}"

    * See Also
      
      ((<SDL::TTF#render_solid_utf8>)), ((<SDL::TTF#render_shaded_utf8>)), ((<SDL::TTF#render_blended_utf8>)), ((<SDL::TTF#draw_solid_utf8>)), ((<SDL::TTF#draw_shaded_utf8>)), ((<SDL::TTF#draw_blended_utf8>))

--- SDL::TTF#render_solid_utf8(text, r, g, b)
--- SDL::TTF#renderSolidUTF8(text, r, g, b)

    ((|text|)) で指定した文字列(エンコーディングはUTF8)を
    ((|r|)), [g], ((|b|)) で指定した色でレンダリングし、結果を
    ((<SDL::Surface>)) のインスタンスで返します。
    
    ((<SDL::TTF#render_shaded_utf8>)) や ((<SDL::TTF#render_blended_utf8>))
    より高速ですが見た目はこれらより良くありません。
    
    生成されるサーフェスは8bppのサーフェスで、指定した色
    および透明色の2色のみ使われます。
    透明色として 0 のピクセル値が、 文字の部分に 1 のピクセル値が
    使われ、パレットの1に指定した色の値が置かれます。
    そのため再レンダリングすることなしに文字の色を変えることができます。
    0 はカラーキーで、透明ですから、
    パレット 0 の色は当然他のサーフェスに((<転送|SDL.blit_surface>))しても
    描画されません。実はこの色は (255-((|r|)), 255-((|g|)), 255-((|b|)))
    です。
    これは ((<SDL::TTF#render_shaded_utf8>)) や ((<SDL::TTF#render_blended_utf8>))
    に比べて高速なレンダリングができますが、
    アンチエイリアシング等はかかっていません。
    また、このメソッドで作ったサーフェスは、
    ((<TTF#render_blended_utf8] で生成したサーフェスを @[転送|SDL.blit_surface>))
    するより高速に転送できます。
    とにかく高速な動作が必要な場合に使うとよいでしょう。


    このメソッドを使うには SDL_ttf が必要です。
    * See Also
      
      ((<SDL::TTF#render_shaded_utf8>)), ((<SDL::TTF#render_blended_utf8>)), ((<SDL::TTF#draw_solid_utf8>))

--- SDL::TTF#render_shaded_utf8(text,fg_r,fg_g,fg_b,bg_r,bg_g,bg_b)
--- SDL::TTF#renderShadedUTF8(text,fg_r,fg_g,fg_b,bg_r,bg_g,bg_b)

    ((|text|)) で指定した文字列(エンコーディングはUTF8)を
    ((|fg_r|)), [fg_g], ((|fg_b|)) で指定した色を文字の色、
    ((|bg_r|)), [bg_g], ((|bg_b|)) で指定した色を背景の色として
    レンダリングし、結果を
    ((<SDL::Surface>)) のインスタンスで返します。
    
    ((<SDL::TTF#render_solid_utf8>))よりレンダリングは低速ですが、
    見た目は ((<SDL::TTF#render_solid_utf8>)) より優れています。
    
    生成される((<サーフェス|SDL::Surface>))は8bppで、ピクセル値 0 が背景で、
    その他のピクセル値は背景色と前景色との中間の色を表現するため
    に使われます。文字にはアンチエイリアスがされています。
    レンダリングの速度は ((<SDL::TTF#render_solid_utf8>)) より低速で、
    ((<SDL::TTF#render_blended_utf8>)) と同じくらいです。
    また、このメソッドで作ったサーフェスは、
    ((<TTF#render_solid_utf8] で生成したサーフェスを@[転送|SDL.blit_surface>))
    するのと同じくらいの速度で転送できます。
    カラーキーによる抜きやアルファブレンドなどは仕組み上使えないので、
    高品質なレンダリングが必要で、背景が一色で問題ない場合に使ってください。


    このメソッドを使うには SDL_ttf が必要です。
    * See Also
      
      ((<SDL::TTF#render_solid_utf8>)), ((<SDL::TTF#render_blended_utf8>)), ((<SDL::TTF#draw_shaded_utf8>))

--- SDL::TTF#render_blended_utf8(text, r, g, b)
--- SDL::TTF#render_blended_utf8(text, r, g, b)

    ((|text|)) で指定した文字列(エンコーディングはUTF8)を
    ((|r|)), [g], ((|b|)) で指定した色でレンダリングし、結果を
    ((<SDL::Surface>)) のインスタンスで返します。
    
    ((<SDL::TTF#render_solid_utf8>))よりレンダリングは低速ですが、
    見た目は優れています。
    
    生成されるサーフェスは32bppARGBのもので、アルファを使いディザリング
    をし高品質な文字描画をします。背景はアルファ値が完全に透明な値なので、
    ((<SDL::TTF#render_shaded_utf8>)) のように文字のまわりに四角が描かれる
    ことはありません。文字にはアンチエイリアシングがされています。
    レンダリングに必要な時間は ((<SDL::TTF#render_solid_utf8>)) より長く、
    ((<SDL::TTF#render_shaded_utf8>)) と同じくらいです。
    また、生成したサーフェスを((< blit 転送|SDL.blit_surface>))するのには、
    ((<SDL::TTF#render_solid_utf8>)) や ((<SDL::TTF#render_shaded_utf8>)) で生成した
    サーフェスを転送するより時間がかかります。
    このメソッドは高品質なレンダリングが必要で、速度がそれほど必要と
    されない場合に利用してください。


    このメソッドを使うには SDL_ttf が必要です。
    * See Also
      
      ((<SDL::TTF#render_solid_utf8>)), ((<SDL::TTF#render_shaded_utf8>)), ((<SDL::TTF#draw_blended_utf8>))

--- SDL::TTF#draw_solid_utf8(dest, text, x, y, r, g, b)
--- SDL::TTF#drawSolidUTF8(dest, text, x, y, r, g, b)

    ((|text|)) で指定した文字列を ((|dest|)) で指定した((<サーフェス|SDL::Surface>))の
    (((|x|)), ((|y|))) を左上とした場所に(((|r|)), ((|g|)), ((|b|)))で指定した色で
    描画します。描画される文字の品質や速度などは ((<SDL::TTF#render_solid_utf8>))
    と同じ特性を持ちます。詳しくはそちらを見てください。


    このメソッドを使うには SDL_ttf が必要です。
    * See Also
      
      ((<SDL::TTF#draw_shaded_utf8>)), ((<SDL::TTF#draw_blended_utf8>)), ((<SDL::TTF#render_solid_utf8>))

--- SDL::TTF#draw_shaded_utf8(dest, text, x, y, fg_r, fg_g, fg_b, bg_r, bg_g, bg_b)
--- SDL::TTF#drawShadedUTF8(dest, text, x, y, fg_r, fg_g, fg_b, bg_r, bg_g, bg_b)

    ((|text|)) で指定した文字列を ((|dest|)) で指定した((<サーフェス|SDL::Surface>))の
    (((|x|)), ((|y|))) を左上とした場所に(((|fg_r|)), ((|fg_g|)), ((|fg_b|)))で指定した
    色で文字を、(((|bg_r|)), ((|bg_g|)), ((|bg_b|)))で指定した色を背景として
    描画します。描画される文字の品質や速度などは ((<SDL::TTF#render_shaded_utf8>))
    と同じ特性を持ちます。そのため(((|x|)), ((|y|)))を左上とし、
    ((<SDL::TTF#size_text>))(((|text|))) を幅、高さとする長方形が指定した背景色で
    塗りつぶされます。


    このメソッドを使うには SDL_ttf が必要です。
    * See Also
      
      ((<SDL::TTF#draw_solid_utf8>)), ((<SDL::TTF#draw_blended_utf8>)), ((<SDL::TTF#render_shaded_utf8>))

--- SDL::TTF#draw_blended_utf8(dest, text, x, y, r, g, b)
--- SDL::TTF#drawBlendedUTF8(dest, text, x, y, r, g, b)

    ((|text|)) で指定した文字列を ((|dest|)) で指定した((<サーフェス|SDL::Surface>))の
    (((|x|)), ((|y|))) を左上とした場所に(((|r|)), ((|g|)), ((|b|)))で指定した色で
    描画します。描画される文字の品質や速度などは ((<SDL::TTF#render_blended_utf8>))
    と同じ特性を持ちます。詳しくはそちらを見てください。


    このメソッドを使うには SDL_ttf が必要です。
    * See Also
      
      ((<SDL::TTF#draw_solid_utf8>)), ((<SDL::TTF#draw_shaded_utf8>)), ((<SDL::TTF#render_blended_utf8>))

--- SDL::BMFont.open(filename, flags)

    ((|filename|)) で指定したフォントをロードし、そのフォントを表わす
    オブジェクトを ((<SDL::BMFont>)) のインスタンスとして返します。
    
    ((|flags|)) としては以下の値を与えることができます。
    :SDL::BMFont::TRANSPARENT
      ((<SDL::Surface#set_color_key>)) で適当な透過色を与える(常に使うべき)。
    :SDL::BMFont::NOCONVERT
      読み込んだフォント画像に対し ((<SDL::Surface#display_format>)) を呼ばない。
    :SDL::BMFont::SFONT
      読み込んだフォント画像を SFont フォーマットと仮定する。
      これを与えない場合は独自形式と仮定する。
    :SDL::BMFont::PALETTE
      読みこんだサーフェスを 8bppパレット付きサーフェスに変換する。
      これは SFont 形式のフォントに対しては使えません。
      これをすると描画が少し遅くなりますが ((<SDL::BMFont#set_color>)) は速くなります。


    このメソッドを使うには SGE が必要です。
--- SDL::BMFont#set_color(r, g, b)
--- SDL::BMFont#setColor(r, g, b)

    フォントの色を (((|r|)), ((|g|)), ((|b|))) に変更します。多色フォントおよび
    SFontに対しては利用できません。このメソッドを何度も呼ぶのであれば
    ((<SDL::BMFont.open>)) で ((<SDL::BMFont::PALETTE>)) を与えておくと良いでしょう。


    このメソッドを使うには SGE が必要です。
--- SDL::BMFont#height

    フォントの高さを返します。


    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::BMFont#width>))

--- SDL::BMFont#width

    文字一つ分の幅を返します。SFont に対しては使えません。


    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::BMFont#height>))

--- SDL::BMFont#text_size(string)
--- SDL::BMFont#textSize(string)

    ((|self|)) で表わされるフォントで ((|string|)) を描画するのに必要な
    サーフェスの大きさを [幅, 高さ] という配列で返します。
    長さの単位はピクセル数です。


    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::BMFont#textout>))

--- SDL::BMFont#textout(surface, string, x, y)

    ((|string|)) を ((|surface|)) の (((|x|)), ((|y|))) に描画します。


    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::BMFont#text_size>))

--- SDL::Kanji.open(filename, size)

    ((|filename|)) で指定した bdf ファイルを読みこみ、((<SDL::Kanji>)) のインスタンス
    を返します。((|size|)) で文字のサイズを指定します。この値は
    文字の高さに相当します。またいわゆる半角文字2文字分の幅にもなります。

    * See Also
      
      ((<SDL::Kanji#add>))

--- SDL::Kanji#add(filename)

    ((|filename|)) で指定した bdf ファイルを読みこみ、((|self|)) に無かった文字を
    新しいフォントで補完します。これを使って英語と日本語を別のフォント
    から読みこむ、といったことができます。

    * See Also
      
      ((<SDL::Kanji#open>))

--- SDL::Kanji#set_coding_system(sys)
--- SDL::Kanji#setCodingSystem(sys)

    文字コードを指定します。 ((|sys|)) として以下のいずれかを指定できます。
    * SDL::Kanji::SJIS
    * SDL::Kanji::EUC
    * SDL::Kanji::JIS
    デフォルトでは SDL::Kanji::JIS が指定されています。

--- SDL::Kanji#height

    フォントの高さをピクセル数で返します。これはいわゆる全角文字の幅であり、
    いわゆる半角文字の幅の2倍の値です。

--- SDL::Kanji#textwidth(text)

    ((|text|)) で指定した文字列を描画するのに必要な幅をピクセル数で返します。

    * See Also
      
      ((<SDL::Kanji#width>))

--- SDL::Kanji#width

    半角文字1文字の幅をピクセル数で得ます。

    * See Also
      
      ((<SDL.textwidth>))

--- SDL::Kanji#put(surface, text, x, y, r, g, b)

    ((|text|)) で指定した文字列を ((|surface|)) の (((|x|)), ((|y|))) に (((|r|)), ((|g|)), ((|b|)))
    で指定した色で描画します。

    * See Also
      
      ((<SDL::Kanji#put_tate>))

--- SDL::Kanji#put_tate(surface, x, y, r, g, b)
--- SDL::Kanji#putTate(surface, x, y, r, g, b)

    ((|text|)) で指定した文字列を ((|surface|)) の (((|x|)), ((|y|))) に (((|r|)), ((|g|)), ((|b|)))
    で指定した色で縦書きで描画します。
    
    ASCII文字は縦書きにできません。

    * See Also
      
      ((<SDL::Kanji#put>))

= 衝突判定
* ((<衝突判定システムの概要>))
* ((<SDL::CollisionMap>))

* ((<衝突判定関連メソッド>))
  * ((<SDL::Surface#make_collision_map>)) -- 衝突判定のためのCollisionMapを生成する。
  * ((<SDL::CollisionMap#collision_check>)) -- 衝突判定をします。
  * ((<SDL::CollisionMap#bounding_box_check>)) -- 2つの長方形が重なっているかどうかを判定します。
  * ((<SDL::CollisionMap#clear>)) -- 指定した範囲を衝突なしの状態にします。
  * ((<SDL::CollisionMap#set>)) -- 指定した範囲を衝突ありの状態にします。
  * ((<SDL::CollisionMap#w>)) -- 衝突判定用画像の幅を返します。
  * ((<SDL::CollisionMap#h>)) -- 衝突判定用画像の高さを返します。

== 衝突判定システムの概要
Ruby/SDL には ((<SGE|URL:http://www.etek.chalmers.se/~e8cal1/sge/index.html>))
由来の衝突判定システムがあります。
基本的な仕組みは、判定のある部分と無い部分の2値の長方形画像を生成し、
それを2つ持ってきて、重なっている部分を1ピクセルずつ見ていくことで
その2つが衝突しているか、つまり重なっているかどうかを判定します。

sample/collision.rb も参考にしてください。

== SDL::CollisionMap
衝突判定のための2値画像を表わすクラスです。
((<SDL::Surface#make_collision_map>)) によってのみインスタンスが作れます。

* ((<SDL::CollisionMap#collision_check>)) -- 衝突判定をします。
* ((<SDL::CollisionMap#bounding_box_check>)) -- 2つの長方形が重なっているかどうかを判定します。
* ((<SDL::CollisionMap#clear>)) -- 指定した範囲を衝突なしの状態にします。
* ((<SDL::CollisionMap#set>)) -- 指定した範囲を衝突ありの状態にします。
* ((<SDL::CollisionMap#w>)) -- 衝突判定用画像の幅を返します。
* ((<SDL::CollisionMap#h>)) -- 衝突判定用画像の高さを返します。

== 衝突判定関連メソッド

--- SDL::Surface#make_collision_map
--- SDL::Surface#makeCollisionMap

    ((<SDL::Surface>)) のインスタンスから ((<SDL::CollisionMap>)) を生成します。
    ((|self|)) のピクセルのうちカラーキーで透明ピクセルになっている
    所が衝突しない所、そうでないピクセルが衝突するピクセルになります。

    失敗したときには例外((<SDL::Error>))を発生させます。


    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::Surface#set_color_key>)), ((<SDL::CollisionMap#collision_check>)), ((<SDL::CollisionMap#clear>)), ((<SDL::CollisionMap#set>))

--- SDL::CollisionMap#collision_check(x1, y1, cmap, x2, y2)

    ((|self|)) の左上が 座標 (((|x1|)), ((|y1|)))、もうひとつの
    ((<SDL::CollisionMap>)) のインスタンス ((|cmap|)) の左上が (((|x2|)), ((|y2|)))に
    ある場合に、この2つが重なっているかどうかを判定し、重なっている
    なら true を、いないなら false を返します。
    
    このメソッドは内部で ((<SDL::CollisionMap#bounding_box_check>)) を
    呼んでいます。


    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::CollisionMap#bounding_box_check>))

--- SDL::CollisionMap#bounding_box_check(x1, y1, cmap, x2, y2)
--- SDL::CollisionMap#boundingBoxCheck(x1, y1, cmap, x2, y2)

    ((<SDL::CollisionMap>)) のインスタンスを長方形と見なし、
    ((|self|)) の左上が (((|x1|)), ((|y1|)))、((|cmap|)) の左上の点が (((|x2|)), ((|y2|)))に
    あるとして2つの長方形が重なっているかどうかを判定します。

    長方形が重なっていれば true を、いなければ false を返します。


    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::CollisionMap#collision_check>)), ((<SDL::CollisionMap#w>)), ((<SDL::CollisionMap#h>))

--- SDL::CollisionMap#clear(x, y, w, h)

    引数で指定した長方形を衝突なしの状態にします。


    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::CollisionMap#set>))

--- SDL::CollisionMap#set(x, y, w, h)

    引数で指定した長方形を衝突ありの状態にします。


    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::CollisionMap#set>))

--- SDL::CollisionMap#w

    衝突判定用画像の幅を返します。


    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::CollisionMap#h>))

--- SDL::CollisionMap#h

    衝突判定用画像の高さを返します。


    このメソッドを使うには SGE が必要です。
    * See Also
      
      ((<SDL::CollisionMap#w>))

= SDLSKK
* ((<SDLSKKによる日本語入力について>))
* ((<SDL::SKK::Context>))
* ((<SDL::SKK::Dictionary>))
* ((<SDL::SKK::Keybind>))
* ((<SDL::SKK::RomKanaRuleTable>))
* ((<SDLSKK関連メソッド>))
  * ((<SDL::SKK.encoding=>)) -- SDLSKK内部のエンコーディングを指定します。
  * ((<SDL::SKK.encoding>)) -- SDLSKKの内部エンコーディングを得ます。
  * ((<SDL::SKK::RomKanaRuleTable.new>)) -- アルファベットからかなへの変換テーブルを読み込みます。
  * ((<SDL::SKK::Dictionary.new>)) -- 空の辞書を生成します。
  * ((<SDL::SKK::Dictionary#load>)) -- 辞書ファイルを読み込みます。
  * ((<SDL::SKK::Dictionary#save>)) -- ユーザ辞書をファイルに出力します。
  * ((<SDL::SKK::Keybind.new>)) -- 空のキーバインドを作ります。
  * ((<SDL::SKK::Keybind#set_key>)) -- キーバインドを設定します。
  * ((<SDL::SKK::Keybind#set_default_key>)) -- Emacsに似た標準的なキーバインドを設定します。
  * ((<SDL::SKK::Keybind#unset_key>)) -- 指定したキーのキーバインドを無効にします。
  * ((<SDL::SKK::Context.new>)) -- 入力コンテキストを生成する。
  * ((<SDL::SKK::Context#input>)) -- キーボードからの入力を受け付けます。
  * ((<SDL::SKK::Context#str>)) -- 入力途中の文字列を得ます。
  * ((<SDL::SKK::Context#render_str>)) -- 入力文字列をレンダリングします。
  * ((<SDL::SKK::Context#render_minibuffer_str>)) -- ミニバッファの文字列をレンダリングします。
  * ((<SDL::SKK::Context#clear>)) -- 入力状態をクリアします。
  * ((<SDL::SKK::Context#clear_text>)) -- 入力テキストをクリアします。
  * ((<SDL::SKK::Context#get_basic_mode>)) -- 状態が入力途中の状態でないかどうかを得る。

== SDLSKKによる日本語入力について
Ruby/SDL には ((<SDLSKK|URL:http://www.kmc.gr.jp/~ohai/sdlskk.html>))
を利用した ((<SKK|URL:http://openlab.jp/skk/index-j.html>))
に似た日本語入力システムがあります。

これは日本語入力ができるだけでなく、
カット&ペーストを含む簡単な行編集機能を持っています。

sample/sdlskk.rb も参考にしてください。

== SDL::SKK
SDLSKK関連のモジュール関数およびクラスを持つモジュールです。

* ((<SDL::SKK.encoding=>)) -- SDLSKK内部のエンコーディングを指定します。
* ((<SDL::SKK.encoding>)) -- SDLSKKの内部エンコーディングを得ます。

== SDL::SKK::Context
入力の状態などを表わすクラスで、SDL::SKKの中心的なクラスです。

* ((<SDL::SKK::Context.new>)) -- 入力コンテキストを生成する。
* ((<SDL::SKK::Context#input>)) -- キーボードからの入力を受け付けます。
* ((<SDL::SKK::Context#str>)) -- 入力途中の文字列を得ます。
* ((<SDL::SKK::Context#render_str>)) -- 入力文字列をレンダリングします。
* ((<SDL::SKK::Context#render_minibuffer_str>)) -- ミニバッファの文字列をレンダリングします。
* ((<SDL::SKK::Context#clear>)) -- 入力状態をクリアします。
* ((<SDL::SKK::Context#clear_text>)) -- 入力テキストをクリアします。
* ((<SDL::SKK::Context#get_basic_mode>)) -- 状態が入力途中の状態でないかどうかを得る。

== SDL::SKK::Dictionary
辞書を表わすクラスです。ファイルから SKK 形式の辞書を読み込むこと
ができます。

* ((<SDL::SKK::Dictionary.new>)) -- 空の辞書を生成します。
* ((<SDL::SKK::Dictionary#load>)) -- 辞書ファイルを読み込みます。
* ((<SDL::SKK::Dictionary#save>)) -- ユーザ辞書をファイルに出力します。

== SDL::SKK::Keybind
入力のキーバインドを表わすクラスです。

* ((<SDL::SKK::Keybind.new>)) -- 空のキーバインドを作ります。
* ((<SDL::SKK::Keybind#set_key>)) -- キーバインドを設定します。
* ((<SDL::SKK::Keybind#set_default_key>)) -- Emacsに似た標準的なキーバインドを設定します。
* ((<SDL::SKK::Keybind#unset_key>)) -- 指定したキーのキーバインドを無効にします。

== SDL::SKK::RomKanaRuleTable
ローマ字 -> 仮名 の変換テーブルを表わすクラスです。
この変換テーブルは、SDLSKK独自の形式のテキストファイルで、
それを読み込んでインスタンスを生成します。

変換テーブルファイルは SDLSKK に付属しています。

* ((<SDL::SKK::RomKanaRuleTable.new>)) -- アルファベットからかなへの変換テーブルを読み込みます。

== SDLSKK関連メソッド

--- SDL::SKK.encoding=(encoding)

    SDLSKK内部のエンコーディングを ((|encoding|)) に指定します。
    * SDL::SKK::EUCJP
    * SDL::SKK::UTF8
    * SDL::SKK::SJIS
    のいずれかを指定してください。SDL::SKK::EUCJP がデフォルトです。
    また、これはSDLSKK関連の他のメソッドを呼ぶ前に呼んでください。
    
    これは、((<SDL::SKK::Dictionary#load>))と((<SDL::SKK::RomKanaRuleTable.new>))で
    読み込むファイルおよび ((<SDL::SKK::Context#str>)) で得られる文字列、
    ((<SDL::SKK::Dictionary#save>)) で書き出すファイルの
    エンコードを決定します。


    このメソッドを使うには SDLSKK が必要です。
    * NOTES

      このモジュール関数は最初に1回だけ呼んでください。
      途中でエンコーディングを変更すると正しく動作しません。

    * See Also
      
      ((<SDL::SKK.encoding>)), ((<SDL::SKK::Dictionary#load>)), ((<SDL::SKK::Dictionary#save>)), ((<SDL::SKK::RomKanaRuleTable.new>))

--- SDL::SKK.encoding

    SDLSKKの内部エンコーディングを返します。詳しくは ((<SDL::SKK.encoding=>)) を
    見てください。


    このメソッドを使うには SDLSKK が必要です。
    * See Also
      
      ((<SDL::SKK.encoding=>))

--- SDL::SKK::RomKanaRuleTable.new(filename)

    ((|filename|))で指定したファイルをアルファベットからかなへの変換テーブル
    として読み込みます。
    ファイルの形式は以下の通りです。
    * 「;;」 で始まる行はコメント
    * 空行は無視される
    * それ以外の行は1行1エントリーで、以下のような形式
        入力アルファベット<TAB>かな変換後に残るアルファベット<TAB>片仮名<TAB>平仮名
    
      


    このメソッドを使うには SDLSKK が必要です。
    * NOTES

      このファイルのエンコーディングは ((<SDL::SKK.encoding=>)) であらかじめ指定しておいて
      ください。

    * See Also
      
      ((<SDL::SKK::Context.new>))

--- SDL::SKK::Dictionary.new

    空の辞書として ((<SDL::SKK::Dictionary>)) のインスタンスを生成します。
    適当な辞書をこれに読み込んでください。


    このメソッドを使うには SDLSKK が必要です。
    * See Also
      
      ((<SDL::SKK::Dictionary#load>))

--- SDL::SKK::Dictionary#load(filename, user)

    ((|filename|)) で指定した辞書を読み込みます。辞書の形式は SKK のものと
    同一です(ただしannotationを含むものは不可です)。
    ((|user|)) を真にすると
    その辞書はユーザ辞書であると扱われ、そこに含まれる
    エントリーすべてにユーザ入力マークが付きます。
    
    ユーザ入力マークが付いたエントリーのみが ((<SDL::SKK::Dictionary#save>)) で
    ユーザ辞書に出力されます。

    失敗したときには例外((<SDL::Error>))を発生させます。


    このメソッドを使うには SDLSKK が必要です。
    * NOTES

      このファイルのエンコーディングは ((<SDL::SKK.encoding=>)) であらかじめ指定しておいて
      ください。

    * See Also
      
      ((<SDL::SKK::Dictionary.new>)), ((<SDL::SKK::Dictionary#save>)), ((<SDL::SKK::Context.new>))

--- SDL::SKK::Dictionary#save(filename)

    ((|filename|)) で指定したファイルにユーザ辞書を出力します。
    ユーザが利用した変換と、
    ((<SDL::SKK::Dictionary#load>)) で「ユーザ辞書」として読み込まれた
    項とをあわせたものを、ユーザ辞書として扱います。


    このメソッドを使うには SDLSKK が必要です。
    * See Also
      
      ((<SDL::SKK::Dictionary.new>)), ((<SDL::SKK::Dictionary#load>))

--- SDL::SKK::Keybind.new

    空のキーバインドに対応する ((<SDL::SKK::Keybind>)) のインスタンスを返します。
    これに ((<SDL::SKK::Keybind#set_key>)) や ((<SDL::SKK::Keybind#set_default_key>))
    などを使ってキーバインドを追加して使います。


    このメソッドを使うには SDLSKK が必要です。
    * See Also
      
      ((<SDL::SKK::Keybind#set_key>)), ((<SDL::SKK::Keybind#set_default_key>)), ((<SDL::SKK::Context.new>))

--- SDL::SKK::Keybind#set_key(key_str, cmd_str)

    ((|key_str|)) に設定したいキーを示す文字列を、((|cmd_str|)) に設定したい
    動作を示す文字列を与え、キーバインドを設定します。
    
    ((|key_str|)) としては以下のような文字列を与えることができます。
    * アルファベット、"%" などのasciiの記号
    * "SPC" "TAB" "DEL" "RET" "UP" "DOWN" "RIGHT" "LEFT" "INSERT" "HOME" "END"
      "PAGEUP" "PAGEDOWN" "F1" "F2" "F3" "F4" "F5" "F6" "F7" "F8" "F9" "F10"
      "F11" "F12" "F13" "F14" "F15" "HELP"
    * "C-a" "M-C-a" などといった修飾キーの付いた文字列
    _
    また、((|cmd_str|)) には以下の文字列を与えることができます。
    * "backward-char",
    * "forward-char",
    * "backward-delete-char",
    * "delete-char",
    * "kakutei",
    * "kettei",
    * "space",
    * "keyboard-quit",
    * "set-mark-command",
    * "kill-region",
    * "yank",
    * "copy",
    * "graph-char",
    * "upper-char",
    * "lower-char",
    * "abbrev-input",
    * "latin-mode",
    * "previous-candidate",
    * "jisx0208-mode",
    * "toggle-kana",
    * "beginning-of-line"
    * "end-of-line"
    * "do-nothing"
    
    ただし、"a" や "/" といったアスキー文字1文字のキーにはデフォルト
    以外のキーバインドはしないようにしてください。
    
    標準のキーバインドを少し変更したいという場合は、まず
    ((<SDL::SKK::Keybind#set_default_key>)) を呼んで、デフォルトのキーバインドを
    設定してからこのメソッドを呼んでください


    このメソッドを使うには SDLSKK が必要です。
    * See Also
      
      ((<SDL::SKK::Keybind#set_default_key>)), ((<SDL::SKK::Keybind#unset_key>))

--- SDL::SKK::Keybind#set_default_key

    Emacsに似た標準的なキーバインドを設定します。


    このメソッドを使うには SDLSKK が必要です。
    * See Also
      
      ((<SDL::SKK::Keybind#set_key>))

--- SDL::SKK::Keybind#unset_key(key_str)

    ((|key_str|)) で指定したキーのキーバインドを無効にします。
    ((|key_str|)) には ((<SDL::SKK::Keybind#set_key>)) と同じ値を使います。


    このメソッドを使うには SDLSKK が必要です。
--- SDL::SKK::Context.new(dict, romkama_table, bind, use_minibuffer)

    入力コンテキストを生成し、((<SDL::SKK::Context>)) のインスタンスを返します。
    ((|dict|)) は利用する辞書として ((<SDL::SKK::Dictionary>)) のインスタンスを、
    ((|romkama_table|)) はローマ字かな変換規則として ((<SDL::SKK::RomKanaRuleTable>))
    のインスタンスを、((|bind|)) にはキーバインドとして ((<SDL::SKK::Keybind>)) のインスタンス
    を与える。
    use_minibuffer に真値を与えるとミニバッファを利用するようになります。
    偽では利用しません。


    このメソッドを使うには SDLSKK が必要です。

    EXAMPLE
      # 辞書を生成し、ファイルから辞書データを読み込む
      dict = SDL::SKK::Dictionary.new
      dict.load( 'jisyo', false )
      # ローマ字仮名変換テーブルを読み込む
      table = SDL::SKK::RomKanaRuleTable.new( 'rule_table' )
      # キーバインドを設定する
      bind = SDL::SKK::Keybind.new
      bind.set_default_key
      
      # コンテキストを生成
      context = SDL::SKK::Context.new( dict, table, bind, use_minibuffer )

    * See Also
      
      ((<SDL::SKK::Context#input>)), ((<SDL::SKK::Context#str>))

--- SDL::SKK::Context#input(event)

    イベント経由でキーボードからの入力を受け付け、
    コンテキストの状態を変更します。
    ((|event|)) には ((<SDL::Event2>)) のインスタンスを与えます。
    ((<SDL::Event2::KeyDown>)) 以外のイベントは無視します。


    このメソッドを使うには SDLSKK が必要です。

    EXAMPLE
      while event = SDL::Event2.poll do
        case event
        when SDL::Event2::Quit
          exit
        when SDL::Event2::KeyDown
          if event.sym == SDL::Key::ESCAPE then
            exit
          end
          if event.sym == SDL::Key::F1
            dict.save("test_user_dict")
          end
          context.input( event )      
        end
      end

--- SDL::SKK::Context#str

    入力途中の文字列を返します。


    このメソッドを使うには SDLSKK が必要です。
    * See Also
      
      ((<SDL::SKK::Context#render_str>)), ((<SDL::SKK::Context#clear>)), ((<SDL::SKK::Context#clear_text>))

--- SDL::SKK::Context#render_str(font, r, g, b)

    ((|self|)) が持っている入力途中の文字列をレンダリングして
    ((<SDL::Surface>)) のインスタンスを返します。
    ((|font|)) はレンダリングに利用するフォントを ((<SDL::TTF>)) のインスタンスで与え、
    その色を (((|r|)), ((|g|)), ((|b|))) で指定します。


    このメソッドを使うには SDLSKK が必要です。
    * See Also
      
      ((<SDL::SKK::Context#render_minibuffer_str>))

--- SDL::SKK::Context#render_minibuffer_str(font, r, g, b)

    ((|self|)) が持っている入力途中のミニバッファの状態をレンダリングして
    ((<SDL::Surface>)) のインスタンスを返します。
    ((|font|)) はレンダリングに利用するフォントを ((<SDL::TTF>)) のインスタンスで与え、
    その色を (((|r|)), ((|g|)), ((|b|))) で指定します。


    このメソッドを使うには SDLSKK が必要です。
--- SDL::SKK::Context#clear

    力文字列と入力状態をクリアして初期状態に戻します。


    このメソッドを使うには SDLSKK が必要です。
    * See Also
      
      ((<SDL::SKK::Context#clear_text>))

--- SDL::SKK::Context#clear_text

    ((|self|)) の入力モードが、確定入力モード、アルファベット入力モード、
    JISX0208アルファベット入力モードのいずれかであればそのモードを
    維持したまま入力テキストを空にします。
    
    複数行の入力を実現したい場合、((<SDL::SKK::Context>)) を呼ぶと
    モードが確定入力モードに戻ってしまうのが不自然である場合、
    この関数を呼ぶとよい。
    
    また、カットバッファの内容も保存されます。


    このメソッドを使うには SDLSKK が必要です。
    * See Also
      
      ((<SDL::SKK::Context#get_basic_mode>))

--- SDL::SKK::Context#get_basic_mode

    ((<SDL.self>)) の入力モードが、確定入力モード、アルファベット入力モード、
    JISX0208アルファベット入力モードのいずれかであれば真を、それ
    以外では偽を返す。辞書登録モードのときなども偽を返します。
    
    これが真のときにリターンキーを押したら入力終了とみなす、
    などといった処理に利用します。


    このメソッドを使うには SDLSKK が必要です。
    * NOTES

      入力モードの名前やその内容については 
      ((<SKK|URL:http://openlab.jp/skk/index-j.html>))
      のマニュアルなどを参考にしてください。

    * See Also
      
      ((<SDL::SKK::Context#clear_text>))

= MPEG playback
* ((<MPEG playback機能概説>))
* ((<SDL::MPEG>))
* ((<SDL::MPEG::Info>))
* ((<MPEG関連メソッド>))
  * ((<SDL::MPEG.new>)) -- MPEGファイルを読み込みます。
  * ((<SDL::MPEG#info>)) -- MPEGオブジェクトの状態を返します。
  * ((<SDL::MPEG#enable_audio>)) -- 音声再生する、しないを設定します。
  * ((<SDL::MPEG#enable_video>)) -- 映像再生する/しないを設定します。
  * ((<SDL::MPEG#status>)) -- 現在の状態を返します。
  * ((<SDL::MPEG#set_volume>)) -- ボリュームを変更します。
  * ((<SDL::MPEG#set_display>)) -- 映像を描画するサーフェスを設定します。
  * ((<SDL::MPEG#set_loop>)) -- 再生をループするかどうかを指定します。
  * ((<SDL::MPEG#scale_xy>)) -- 再生映像の大きさを指定します。
  * ((<SDL::MPEG#scale>)) -- 再生画像の大きさの倍率を指定します。
  * ((<SDL::MPEG#move>)) -- 再生画像の描画位置を指定します。
  * ((<SDL::MPEG#set_display_region>)) -- 映像が描画される位置と大きさを決めます。
  * ((<SDL::MPEG#play>)) -- MPEGを再生します。
  * ((<SDL::MPEG#stop>)) -- MPEGの再生を停止します。
  * ((<SDL::MPEG#pause>)) -- MPEGの再生を一時停止/再開します。
  * ((<SDL::MPEG#rewind>)) -- MPEGの再生位置を最初に移動します。
  * ((<SDL::MPEG#seek>)) -- MPEGの再生位置を移動します。
  * ((<SDL::MPEG#skip>)) -- MPEGの再生位置を指定した秒だけ進めます。
  * ((<SDL::MPEG#render_frame>)) -- 特定のフレームを描画します。
  * ((<SDL::MPEG#render_final>)) -- 最後のフレームを描画します。
  * ((<SDL::MPEG#set_filer>)) -- 映像にかけるフィルタを指定します。
  * ((<SDL::MPEG::Info#has_audio>)) -- MPEGストリームが音声を持っているかを返します。
  * ((<SDL::MPEG::Info#has_video>)) -- MPEGストリームが映像を持っているかを返します。
  * ((<SDL::MPEG::Info#width>)) -- 映像の幅を返します。
  * ((<SDL::MPEG::Info#height>)) -- 映像の高さを返します。
  * ((<SDL::MPEG::Info#current_frame>)) -- 
  * ((<SDL::MPEG::Info#current_fps>)) -- 
  * ((<SDL::MPEG::Info#audio_string>)) -- 
  * ((<SDL::MPEG::Info#audio_current_frame>)) -- 
  * ((<SDL::MPEG::Info#current_offset>)) -- 
  * ((<SDL::MPEG::Info#total_size>)) -- 
  * ((<SDL::MPEG::Info#current_time>)) -- 
  * ((<SDL::MPEG#total_time>)) -- 

== MPEG playback機能概説
Ruby/SDLはMPEGの映像および音声を
((<SMPEG|URL:http://www.icculus.org/smpeg>))
を利用して再生することができます。

これを利用するためには、初期化時に ((<SDL.init>)) の引数として
SDL::INIT_AUDIO|SDL::INIT_VIDEO を与え、さらにその後
((<SDL::Mixer.open>)) を呼ぶ必要があります。

また、この機能は内部では OS ネイティブのスレッド機能を使い、
別スレッドで再生ルーチンを呼ぶことで実現されています。
そのため再生中は再生映像が描画されている ((<サーフェス|SDL::Surface>))
にアクセスしてはなりません。
もう一つ、 SDL_Mixer の音声再生機能をフックしているため
音声を伴う再生、つまり ((<SDL::MPEG#enable_audio>)) を真にして
((<SDL::MPEG#play>)) を呼びだした場合にはその再生中には ((<SDL::Mixer>))
での音声再生はできません。

これらの制限に対しては、一切のチェックを Ruby/SDL では行って
いません。よって MPEG 再生機能を使う場合には以上のことに
注意してください。

== SDL::MPEG
MPEGストリームを表わすクラスです。再生状態もこのクラスが
保持します。

* ((<SDL::MPEG.new>)) -- MPEGファイルを読み込みます。
* ((<SDL::MPEG#info>)) -- MPEGオブジェクトの状態を返します。
* ((<SDL::MPEG#enable_audio>)) -- 音声再生する、しないを設定します。
* ((<SDL::MPEG#enable_video>)) -- 映像再生する/しないを設定します。
* ((<SDL::MPEG#status>)) -- 現在の状態を返します。
* ((<SDL::MPEG#set_volume>)) -- ボリュームを変更します。
* ((<SDL::MPEG#set_display>)) -- 映像を描画するサーフェスを設定します。
* ((<SDL::MPEG#set_loop>)) -- 再生をループするかどうかを指定します。
* ((<SDL::MPEG#scale_xy>)) -- 再生映像の大きさを指定します。
* ((<SDL::MPEG#scale>)) -- 再生画像の大きさの倍率を指定します。
* ((<SDL::MPEG#move>)) -- 再生画像の描画位置を指定します。
* ((<SDL::MPEG#set_display_region>)) -- 映像が描画される位置と大きさを決めます。
* ((<SDL::MPEG#play>)) -- MPEGを再生します。
* ((<SDL::MPEG#stop>)) -- MPEGの再生を停止します。
* ((<SDL::MPEG#pause>)) -- MPEGの再生を一時停止/再開します。
* ((<SDL::MPEG#rewind>)) -- MPEGの再生位置を最初に移動します。
* ((<SDL::MPEG#seek>)) -- MPEGの再生位置を移動します。
* ((<SDL::MPEG#skip>)) -- MPEGの再生位置を指定した秒だけ進めます。
* ((<SDL::MPEG#render_frame>)) -- 特定のフレームを描画します。
* ((<SDL::MPEG#render_final>)) -- 最後のフレームを描画します。
* ((<SDL::MPEG#set_filer>)) -- 映像にかけるフィルタを指定します。
* ((<SDL::MPEG#total_time>)) -- 

== SDL::MPEG::Info
((<SDL::MPEG>)) の情報を表わすクラスです。((<SDL::MPEG#info>)) でインスタンスが
得られます。

* ((<SDL::MPEG::Info#has_audio>)) -- MPEGストリームが音声を持っているかを返します。
* ((<SDL::MPEG::Info#has_video>)) -- MPEGストリームが映像を持っているかを返します。
* ((<SDL::MPEG::Info#width>)) -- 映像の幅を返します。
* ((<SDL::MPEG::Info#height>)) -- 映像の高さを返します。
* ((<SDL::MPEG::Info#current_frame>)) -- 
* ((<SDL::MPEG::Info#current_fps>)) -- 
* ((<SDL::MPEG::Info#audio_string>)) -- 
* ((<SDL::MPEG::Info#audio_current_frame>)) -- 
* ((<SDL::MPEG::Info#current_offset>)) -- 
* ((<SDL::MPEG::Info#total_size>)) -- 
* ((<SDL::MPEG::Info#current_time>)) -- 

== MPEG関連メソッド

--- SDL::MPEG.new(filename)
--- SDL::MPEG.load(filename)

    ((|filename|)) で指定したMPEGファイルを読み込み、
    ((<SDL::MPEG>)) の新しいインスタンスを返します。

    失敗したときには例外((<SDL::Error>))を発生させます。


    このメソッドを使うには SMPEG が必要です。
    * See Also
      
      ((<SDL::MPEG#info>)), ((<SDL::MPEG#play>))

--- SDL::MPEG#info

    MPEGオブジェクトの現在の状態を ((<SDL::MPEG::Info>)) のインスタンスで返します。


    このメソッドを使うには SMPEG が必要です。
    * See Also
      
      ((<SDL::MPEG::Info>))

--- SDL::MPEG#enable_audio(enable)
--- SDL::MPEG#enableAudio(enable)

    ((|self|)) を再生するときに音声を再生するかどうかを指定します。
    ((|enable|)) に true を与えると再生し、false を与えると再生
    しないように設定します。これを使い映像のみを再生することができます。


    このメソッドを使うには SMPEG が必要です。
    * NOTES

      このメソッドは演奏中に呼びだしても効果を発揮しません。一度演奏を
      停止し、再び演奏を開始して始めてこの指定が有効になります。

    * See Also
      
      ((<SDL::MPEG#enable_video>)), ((<SDL::MPEG#info>))

--- SDL::MPEG#enable_video(enable)
--- SDL::MPEG#enableVideo(enable)

    ((|self|)) を再生するときに映像を再生するかどうかを指定します。
    ((|enable|)) に true を与えると再生し、false を与えると再生
    しないように設定します。これを使い音声のみを再生することが
    できます。


    このメソッドを使うには SMPEG が必要です。
    * See Also
      
      ((<SDL::MPEG#enable_audio>)), ((<SDL::MPEG#info>))

--- SDL::MPEG#status

    ((|self|)) の現在の状態を以下の3種類の値で返します。
    * SDL::MEPG::ERROR - エラーが生じている
    * SDL::MPEG::STOPPED - 演奏停止中
    * SDL::MPEG::PLAYING - 演奏中


    このメソッドを使うには SMPEG が必要です。
    * See Also
      
      ((<SDL::MPEG#info>))

--- SDL::MPEG#set_volume(volume)
--- SDL::MPEG#setVolume(volume)

    MPEG音声のボリュームを0から100までの値で指定します。


    このメソッドを使うには SMPEG が必要です。
    * NOTES

      現在設定されているボリュームの大きさを得る方法はありません。

    * See Also
      
      ((<SDL::MPEG#enable_audio>))

--- SDL::MPEG#set_display(surface)
--- SDL::MPEG#setDisplay(surface)

    再生された映像を描画する((<サーフェス|SDL::Surface>))を設定します。これには通常
    ((<SDL.set_video_mode>)) で得たサーフェスを与えます。


    このメソッドを使うには SMPEG が必要です。
    * NOTES

      これで指定したサーフェスは再生時に自動で ((<SDL::Screen#update_rect>)) が
      呼ばれます。

    * See Also
      
      ((<SDL::Surface>)), ((<SDL::MPEG#play>))

--- SDL::MPEG#set_loop(repeat)
--- SDL::MPEG#setLoop(repeat)

    再生をループするかどうかを指定します。。
    ((|repeat|)) に true/false を与えるとループする/しないとなります。


    このメソッドを使うには SMPEG が必要です。
    * See Also
      
      ((<SDL::MPEG#play>))

--- SDL::MPEG#scale_xy(width, height)
--- SDL::MPEG#scaleXY(width, height)

    再生する映像の大きさを横 ((|width|)) ピクセル、縦 ((|height|)) ピクセルに指定します。


    このメソッドを使うには SMPEG が必要です。
    * See Also
      
      ((<SDL::MPEG#scale>)), ((<SDL::MPEG#set_display_region>))

--- SDL::MPEG#scale(scale)

    再生する画像の大きさを縦横 ((|scale|)) 倍にします。


    このメソッドを使うには SMPEG が必要です。
    * See Also
      
      ((<SDL::MPEG#scale_xy>))

--- SDL::MPEG#move(x, y)

    再生画像の描画位置を ((<SDL::MPEG#set_display>)) で指定した描画先サーフェスの
    (((|x|)), ((|y|))) に指定します。


    このメソッドを使うには SMPEG が必要です。
    * See Also
      
      ((<SDL::MPEG#set_display>)), ((<SDL::MPEG#set_display_region>))

--- SDL::MPEG#set_display_region(x, y, w, h)

    映像が描画される位置を(((|x|)), ((|y|)))、大きさを(((|w|)), ((|h|)))
    にします。


    このメソッドを使うには SMPEG が必要です。
    * See Also
      
      ((<SDL::MPEG#move>)), ((<SDL::MPEG#scale_xy>))

--- SDL::MPEG#play

    MPEGを再生します。


    このメソッドを使うには SMPEG が必要です。
    * NOTES

      再生中は ((<SDL::MPEG#set_display>)) で指定したサーフェスには
      触れないでください。

    * See Also
      
      ((<SDL::MPEG#pause>)), ((<SDL::MPEG#stop>)), ((<SDL::MPEG#rewind>)), ((<SDL::MPEG#seek>)), ((<SDL::MPEG#skip>)), ((<SDL::MPEG#render_frame>))

--- SDL::MPEG#stop

    MPEGの再生を停止します。


    このメソッドを使うには SMPEG が必要です。
    * See Also
      
      ((<SDL::MPEG#play>))

--- SDL::MPEG#pause

    MPEGの再生中にを一時停止/再開します。再生中なら一時停止、
    一時停止中なら再開します。


    このメソッドを使うには SMPEG が必要です。
--- SDL::MPEG#rewind

    MPEGの再生位置を最初に移動します。


    このメソッドを使うには SMPEG が必要です。
--- SDL::MPEG#seek(bytes)

    MPEGの再生位置を ((|bytes|)) ((*バイト*)) シークします。


    このメソッドを使うには SMPEG が必要です。
    * See Also
      
      ((<SDL::MPEG#play>)), ((<SDL::MPEG#skip>))

--- SDL::MPEG#skip(seconds)

    MPEGの再生位置を ((|seconds|)) 秒進めます。 ((|seconds|)) には Float
    が指定できます。


    このメソッドを使うには SMPEG が必要です。
    * See Also
      
      ((<SDL::MPEG#play>)), ((<SDL::MPEG#seek>))

--- SDL::MPEG#render_frame(framenum)

    MPEGの中の ((|framenum|)) で指定したフレームを ((<SDL::MPEG#set_display>)) で指定した
    サーフェスの ((<SDL::MPEG#move>)) で指定した位置に描画します。


    このメソッドを使うには SMPEG が必要です。
    * See Also
      
      ((<SDL::MPEG#render_final>)), ((<SDL::MPEG#play>))

--- SDL::MPEG#render_final(dst, x, y)

    MPEGの映像の最後のフレームを ((|dst|)) で指定した((<サーフェス|SDL::Surface>))の
    (((|x|)), ((|y|)))の位置に描画します。


    このメソッドを使うには SMPEG が必要です。
--- SDL::MPEG#set_filer(filter)

    映像にかけるフィルタを以下の中から指定します。
    * SDL::MPEG::NULL_FILTER フィルタなし
    * SDL::MPEG::BILIEAR_FILTER 双線型フィルタ
    * SDL::MPEG::DEBLOCKING_FILTER ブロックノイズ軽減フィルタ


    このメソッドを使うには SMPEG が必要です。
--- SDL::MPEG::Info#has_audio

    MPEGストリームが音声を持っているかを true/false で返します。


    このメソッドを使うには SMPEG が必要です。
--- SDL::MPEG::Info#has_video

    MPEGストリームが映像を持っているかを true/false で返します。


    このメソッドを使うには SMPEG が必要です。
--- SDL::MPEG::Info#width

    映像の幅をピクセル数で返します。


    このメソッドを使うには SMPEG が必要です。
--- SDL::MPEG::Info#height

    映像の高さをピクセル数で返します。


    このメソッドを使うには SMPEG が必要です。
--- SDL::MPEG::Info#current_frame

    not documented yet


    このメソッドを使うには SMPEG が必要です。
--- SDL::MPEG::Info#current_fps

    not documented yet


    このメソッドを使うには SMPEG が必要です。
--- SDL::MPEG::Info#audio_string

    not documented yet


    このメソッドを使うには SMPEG が必要です。
--- SDL::MPEG::Info#audio_current_frame

    not documented yet


    このメソッドを使うには SMPEG が必要です。
--- SDL::MPEG::Info#current_offset

    not documented yet


    このメソッドを使うには SMPEG が必要です。
--- SDL::MPEG::Info#total_size

    not documented yet


    このメソッドを使うには SMPEG が必要です。
--- SDL::MPEG::Info#current_time

    not documented yet


    このメソッドを使うには SMPEG が必要です。
--- SDL::MPEG#total_time

    not documented yet


    このメソッドを使うには SMPEG が必要です。
