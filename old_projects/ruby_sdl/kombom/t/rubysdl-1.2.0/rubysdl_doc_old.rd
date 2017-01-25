=begin

= SDL

Ruby/SDL は ((<SDL|URL:http://www.libsdl.org/>)) を Ruby から利用するための
拡張ライブラリです。

SDL の薄いラッパを目指しているため、API は SDL のものと一対一に対応
しているものが多い。よってSDLのドキュメントが非常に参考になるでしょう。

すべての関数/クラス/モジュール/定数はSDLモジュールの下にあります。

また、メソッドの返り値が記述されていない場合は常にnilを返すものとします。

== クラス/モジュール構成

* ((<エラー処理>))
  * ((<SDL::Error>))
* ((<初期化関連>))
* ((<video関連>))
  * ((<SDL::Surface>))
    * ((<SDL::Screen>))
  * ((<SDL::CollisionMap>))
  * ((<SDL::PixelFormat>))
* ((<Event関連>))
  * ((<SDL::Event>))
  * ((<SDL::Event2>))
  * ((<SDL::Key>)) (module)
  * ((<SDL::Mouse>)) (module) 
* ((<audio関連>))
  * ((<SDL::Mixer>)) (module)
  * ((<SDL::Mixer::Wave>))
  * ((<SDL::Mixer::Music>))
* ((<Window Manager 関連>))
  * ((<SDL::WM>)) (module)
* ((<CDROM関係>))
  * ((<SDL::CD>))
* ((<ジョイスティック関連>))
  * ((<SDL::Joystick>))
* ((<フォント関係>))
  * ((<SDL::BMFont>))
  * ((<SDL::Kanji>))
  * ((<SDL::TTF>))
* ((<MPEG再生処理>))
  * ((<SDL::MPEG>))
* ((<時刻処理>))
* ((<SDLSKKによる日本語入力機能>))
  * ((<SDL::SKK::Context>))
  * ((<SDL::SKK::Dictionary>))
  * ((<SDL::SKK::RomKanaRuleTable>))
  * ((<SDL::SKK::Keybind>))
* ((<OpenGLによる3D描画>))
* ((<その他>))

== 機能概説
Ruby/SDLでは、上に挙げたような機能を持っています。
ここでは、その概要を解説します。詳しくは個々の項を見てください。

=== 初期化
SDL全体の初期化をする((<SDL.init>))などです。

=== Video
ウィンドウを開き、そこに描画をするための機能です。
矩形転送、基本的な図形(直線など)の描画、拡大縮小回転、パレット
操作などの機能があります。

=== Event
キーボード、マウスなどから入力を受けとるための機能です。

=== Audio
効果音、BGMなどを演奏するための機能です。

=== Window Manager
Windowのタイトルなどを設定したり、入力をつかんだりする機能です。

=== CDROM
CDを演奏するための機能です。Audio機能とはまったく別個の機能として
実現されています。フェードイン/フェードアウトといった複雑な演奏は
できません。

=== Joystick
パッド/スティックからの入力を処理する機能です。Event機能とも
連携して動作します。

=== Font
独自形式のBitmap font/True Type Font/bdf fontの描画ができます。
True True Font と bdf fontは日本語の描画も可能です。

=== MPEG
MPEGの再生ができます。再生中は通常の描画はできないなどかなり
機能に制限があります。

=== 時刻
((<SDL.init>))が呼ばれてからの経過時間をはかる((<SDL.getTicks>))
と指定ミリ秒停止する((<SDL.delay>))があります。

=== エラー
SDL特有のエラーはすべて ((<SDL::Error>)) という例外を発生させること
で通知されます。


== エラー処理

=== SDL::Error

エラー通知用のクラスです。SDL固有のエラーはこのクラスを用いて通知されます。

==== スーパークラス

StandardError

== 初期化関連

SDLを使う前には必ず((<SDL.init>))でSDLを初期化する必要があります。

=== SDL内のモジュール関数

--- SDL.init(flag)
      SDLを初期化します。
      Ruby/SDLの他のメソッドを呼ぶ前にこのメソッドを呼ばなくてはなりません。
      ((|flag|))でどの部分を初期化するかを指定します。
      以下の定数の論理和を取ったものを指定してください。
      * SDL::INIT_AUDIO  オーディオ機能(音声出力機能)を初期化
      * SDL::INIT_VIDEO  ビデオ機能(画像出力)機能とキーボード、マウス入力機能を初期化
      * SDL::INIT_CDROM  CDROM再生機能を初期化
      * SDL::INIT_JOYSTICK  ジョイスティック入力機能を初期化
      * SDL::INIT_EVERYTHING 上に挙げた機能を全て初期化します。
      
      初期化が失敗した場合は((<SDL::Error>))例外が発生します。

        # 例
        # Video機能とオーディオ機能を初期化する
        SDL.init(SDL::INIT_VIDEO|SDL::INIT_AUDIO)

--- SDL.quit
      SDLをシャットダウンします。SDLが確保したデバイスやウィンドウなどの
      リソースをすべて解放します。
      Ruby/SDLがプログラム終了時に自動的にこのメソッドを呼ぶので、
      通常はこれを使う必要はありません。
      
      SDLの仕様を理解して必要な場合のみ使ってください。
      
      これを呼んだ後SDLの機能を一切使わないでください。そのようなことは
      想定されていません。
      
--- SDL.initedSystem(flag)
--- SDL.inited_system(flag)
      指定した部分が初期化されているかどうかをチェックします。
      ((|flag|))は((<SDL.init>))のものと同じです。
      
      返り値は初期化されている部分に対応する値の論理和です。

        # 例
        # 全部の初期化状態を調べる
        init = SDL.initedSystem(SDL::INIT_EVERYTHING)
        # ビデオ機能が使えるかを見る
        if (init & SDL::INIT_VIDEO) != 0
          puts("ビデオ機能は初期化されています")
        else
          puts("ビデオ機能は初期化されていません")
        end
        
--- SDL.getenv(name)
      ((|name|))で指定した文字列に対応する環境変数を得る。
      返値は文字列であたえられる。
      
--- SDL.putenv(envstr)
      環境変数を変更する。
      
      Windows上ででSDL_WINDOWIDやSDL_VIDEODRIVERといった環境変数を使って
      SDLの実行に影響を与えたいときに利用する。
      SDLの仕様によりWindowsでは ENV を直接変更してもこれらの機能が使え
      ないためこのような関数が存在する。
            
      引数として"name=value"という形式の文字列を与える。
      
      Unix上では組み込み定数ENVを利用するのと同じです。
      失敗時は例外((<SDL::Error>))を発生します。

      # 例
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
      
== video関連

これは、画面描画および表示をする機能を提供します。以下のメソッドを利用する前
に((<SDL.init>))でビデオ機能の初期化(SDL::INIT_VIDEO)をする必要があります。

((<SDL::Surface>))という、画像を収めておくメモリ(これをサーフェスと呼びます)
を表現するクラスが存在し、ビデオ機能はこれを用いて抽象化されています。
つまり、画面上に表示される画像やファイルから読みこんだ画像は共に
このクラスを用いて表され、これに対し描画することでさまざまな
画像効果を得ることができます。

画面に対応するサーフェスは特に((<SDL::Surface>))の
サブクラスである((<SDL::Screen>))というクラスで表現されます。
ここに描きこんだ画像は直接表示には反映されません。
((<SDL::Screen.updateRect>))や((<SDL::Screen.flip>))を呼ぶことで
その時点での内容が表示されます。
このような仕組みはダブルバッファリングなどと呼ばれます。
「描画が完了していない状態」を表示しないことで表示のちらつきが減ります。

((<SDL.setVideoMode>))で、ビデオのモード(解像度やbppなど)を設定すること
で((<SDL::Screen>))のインスタンスを得ることができます。

その他、ガンマ値の設定や、サーフェスごとにパレットを変更したりする
機能が存在します。


一部の機能は、SGEライブラリやSDL_imageが必要です。
bppはbit per pixelの略称です。

以下にいくつかの例を挙げます。


  # 例 ビデオ機能の初期化  
  require 'sdl'
  
  # SDLの初期化
  SDL.init(SDL::INIT_VIDEO)
  
  # 画面の初期化
  # ソフトウェアサーフェス、 解像度 640x480、 16bitカラーモードで初期化
  screen = SDL.setVideoMode(640, 480, 16, SDL::SWSURFACE)

  

  # 例3 BMPファイルのロードおよび表示

  # 指定したファイルを読みこんで画面に表示する関数
  def display_bmp(screen, fname)
    # ファイルをロードする
    image = SDL::Surface.loadBMP(fname)
    SDL.blitSurface(image, 0, 0, 0, 0, screen, 0, 0)
    screen.updateRect(0, 0, image.w, image.h)
  end

=== SDL内のモジュール関数

--- SDL.getVideoSurface
--- SDL.get_video_surface
      Not documented yet

--- SDL.setVideoMode(w,h,bpp,flags)
--- SDL.set_video_mode(w,h,bpp,flags)
      指定された画面の幅、高さ、bppの値でビデオモードを設定する。
      bppが0の場合、現在のディスプレイのbppの値が使用される。
      成功したときは((<SDL::Screen>))のオブジェクトを返す。
      失敗したときは((<SDL::Error>))例外が生じる。
      flagsの意味は以下のとおり。
      * SDL::SWSURFACE
        
        システムのメモリ内にバッファをとる。

      * SDL::HWSURFACE

        ビデオメモリにバッファをとる。

      * SDL::FULLSCREEN
        
        フルスクリーンモードで動作しようとする。

      * SDL::DOUBLEBUF

        ダブルバッファリングができるようにする。
        ((<SDL::Screen#flip>))をよびだすことによってバッファの切り替え
        ができる。

      * SDL::ANYFORMAT

        SDLライブラリは要求されたbppでの設定を試みるが、それと異なっても利用
        可能なモードがあればそれを返してくる。デフォルトの動作では、要求され
        たモードが直接サポートされていない場合はエミュレーションを行う。

      * SDL::OPENGL

        OpenGLを利用した3D描画を有効にする。
        この機能を利用するときは、((<SDL::Surface>))を通した描画は
        使うべきではない。
        
      flagはそのほかにもある。さらに詳しく知る必要があれば
      SDLのドキュメントを見てください。
      
        # 例 最良のビデオモードで初期化
        # 16bitモードを指定したいが、使えなければ他のモードでも可
        screen = SDL.setVideoMode(640, 480, 16  SDL::SWSURFACE|SDL::ANYFORMAT)
        puts "640x480 at #{screen.bpp} bpp のモードに設定しました"
      
--- SDL.checkVideoMode(w,h,bpp,flags)
--- SDL.check_video_mode(w,h,bpp,flags)
      指定されたビデオモードがサポートされているかどうかを調べる。
      指定サイズのスクリーンがどんなデプスでもサポートされていない場合は
      0を返し、いくつかのデプスで指定されたサイズがサポートされていれば、
      引数で指定したものに最も近いbppの値を返す。もしこの値がビデオモード
      を設定する際に指定したものと違っている場合は、((<SDL.setVideoMode>))は
      成功するが、指定されたモードはシャドウサーフェスを使ってエミュレー
      トされることになる。
      
      SDL.checkVideoModeに対する引数は、((<SDL.setVideoMode>))で使用するもの
      と同じである。

--- SDL.listModes(flags)
--- SDL.list_modes(flags)
      利用可能な解像度を返す。
      利用可能な解像度が存在しないときはnil返す。またあらゆる解像度が使用可
      能なときはtrueを返す。利用可能な解像度が1個以上あるときはその解像度を
      の横方向、縦方向の解像度の値をおさめた配列が1個以上入っている配列を返す。
      
      引数のflagは、((<SDL.setVideoMode>))で使用するものと同じである。

--- SDL.videoDriverName
--- SDL.video_driver_name
      初期化したビデオドライバーに対応する文字列を返す( x11 や windib など)。
      初期化していなかったりしたら例外を発生させる。

      # 例
      SDL.init(SDL::INIT_VIDEO)
      puts "ドライバは #{SDL.videoDriverName} です"
      
--- SDL.setGamma(redgamma,greengamma,bluegamma)
--- SDL.set_gamma(redgamma,greengamma,bluegamma)
      表示用のカラーガンマ関数を設定します。
      ガンマはスクリーン上での色の明るさやコントラストを調節します。
      r,g,bそれぞれのガンマ値は1.0で無調整と同等になります。
      失敗時には((<SDL::Error>))例外を発生させます。
            
--- SDL.getGammaRamp
--- SDL.get_gamma_ramp
      ガンマ変換用のテーブルを返す。
      その内容はR,G,Bそれぞれの256個の整数をもつ配列の配列である。

--- SDL.setGammaRamp(table)
--- SDL.set_gamma_ramp(table)
      ガンマ変換用のテーブルを設定する。
      テーブルの形式は((<SDL.getGammaRamp>))で得られるものと同じ。

--- SDL.autoLock
--- SDL.auto_lock
--- SDL.autoLock?
--- SDL.auto_lock?
      SGEが必要

      サーフィスのロックが必要なとき自動的にロックしてくれるかどうか
      を返す。デフォルトはtrue。

      さらに詳しいことを知りたければ((<SDL::Surface#lock>))を見てください。

--- SDL.autoLock=(autolocking)
--- SDL.auto_lock=(autolocking)
--- SDL.autoLockON
--- SDL.auto_lock_on
--- SDL.autoLockOFF
--- SDL.auto_lock_off
      SGEが必要
      サーフィスのロックが必要なとき自動的にロックしてくれるように設定する。
      
--- SDL.videoInfo
--- SDL.video_info
      ビデオハードウェアの情報をVideoInfoのインスタンスで返す。
      その内容は以下の通り。
      真偽値を表すものはtrue,falseが入っている。
      初期化前にこの関数を呼んだ場合、bppには「最も適した」値が入る。
      * SDL::VideoInfo#hw_available
          ハードウェアサーフェスを作ることは可能かどうか
      * SDL::VideoInfo#wm_available
          ウィンドウマネージャが利用できるかどうか
      * SDL::VideoInfo#blit_hw
          ハードウェア間の blit はアクセラレーションが有効かどうか
      * SDL::VideoInfo#blit_hw_CC
          ハードウェア間のカラーキー blit はアクセラレーションが有効かどうか
      * SDL::VideoInfo#blit_hw_A
          ハードウェア間のα blit はアクセラレーションが有効かどうか
      * SDL::VideoInfo#blit_sw
          ソフトウェアからハードウェアへの blit はアクセラレーションが有効かどうか
      * SDL::VideoInfo#blit_sw_CC
          ソフトウェアからハードウェアへのカラーキー blit はアクセラレーション
          が有効かどうか
      * SDL::VideoInfo#blit_sw_A
          ソフトウェアからハードウェアへのα blit はアクセラレーションが有効かどうか
      * SDL::VideoInfo#blit_fill
          色の塗潰しはアクセラレーションが有効かどうか
      * SDL::VideoInfo#video_mem
          ビデオメモリの総容量
      * SDL::VideoInfo#bpp
          bpp
          
--- SDL.blitSurface(src,srcX,srcY,srcW,srcH,dst,dstX,dstY)
--- SDL.blit_surface(src,srcX,srcY,srcW,srcH,dst,dstX,dstY)
      srcで指定されたSurfaceからdstで指定されたSurfaceへの高速なblit
      を行う。

      srcX,srcY,srcW,srcHにすべて0を指定した場合はsrc全体をblitする。

      失敗時には例外SDL::Errorが生じる。      
      
      ロックしたサーフェスに対してこれをつかってはいけない。

--- SDL.blitSurface2(src,srcRect,dst,dstRect)
--- SDL.blit_surface2(src,src_rect,dst,dst_rect)
      blitSurface2(src,[0,32,32,32],dst,[100,200])
      のように使う。
      また、srcRect、dstRectとして x,y,z,wという名前のメソッドを
      持つオブジェクトでその領域を指定することもできる。
      
      srcRectにnilを指定した場合はsrc全体をblitする。

--- SDL.rotateXYScaled(src,dst,x,y,angle,xscale,yscale)
--- SDL.rotate_xy_scaled(src,dst,x,y,angle,xscale,yscale)
      SGEが必要

      SGEのsge_rotate_xyscaled関数とはsrcとdstの順序が入れ替わっていることに
      注意するように。下の2つの関数も同様である。
      これは、blitSurfaceに合わせたためである。
      また、この仕様は変更する可能性がある。

      また、ColorKeyは無視される。

      このメソッドは古いためあまり使うべきではない。
      ((<SDL.transform>))や((<SDL.transformBlit>))を使うべきである。

--- SDL.rotateScaled(src,dst,x,y,angle,scale)
--- SDL.rotate_scaled(src,dst,x,y,angle,scale)
      ((<SDL.rotateXYScaled>))と同様、ただしxscaleとyscaleがともにscaleであると
      する。

--- SDL.rotate(src,dst,x,y,angle)
      ((<SDL.rotateXYScaled>))と同様、ただしxscaleとyscaleがともに1であると
      する。

--- SDL.rotateScaledBlit(src,dst,x,y,angle,scale)
--- SDL.rotate_scaled_blit(src,dst,x,y,angle,scale)
      SGEが必要
      ColorKeyは有効となる。
      ((<SDL.rotateBlit>))も同様である。

--- SDL.rotateBlit(src,dst,x,y,angle)
--- SDL.rotate_blit(src,dst,x,y,angle)
      ((<SDL.rotateScaledBlit>))と同様、ただしscaleが1であるとする。

--- SDL.transform(src,dst,angle,xscale,yscale,px,py,qx,qy,flags)
      SGEが必要
      回転縮小拡大を描画する。
      src全体をpx,pyを中心にangle度回転、X方向にxscale倍、Y方向にyscale倍して
      px、pyがdstのqx、qyに一致するように描画する。
      このメソッドはColor keyを無視する。
      flagの意味は以下の通り。これらのORをとってもよい。

      * 0

        普通に回転させる

      * SDL::TRANSFORM_SAFE

        srcとdstのフォーマットが違ってもうまくいくようにする。多少遅い。

      * SDL::TRANSFORM_AA

        通常より遅いがみためは良くなる。

      * SDL::TRANSFORM_TMAP

        テクスチャーマッピングを使用する。ほんの少しはやいが、みためが少し
        悪くなる。px、py、flagsは無視される。

--- SDL.transformBlit(src,dst,angle,xscale,yscale,px,py,qx,qy,flags)
--- SDL.transform_blit(src,dst,angle,xscale,yscale,px,py,qx,qy,flags)
      SGEが必要

      回転縮小拡大を描画する。
      引数は((<SDL.transform>))と同じ。
      ((<SDL.transform>))との違いはこのメソッドがカラーキーによる
      抜きが有効になることである。

=== SDL::Surface

画像を保持するクラスです。

==== スーパークラス

Object

==== クラスメソッド

--- SDL::Surface.new(flag,w,h,format)
--- SDL::Surface.new(flags,w,h,depth,Rmask,Gmask,Bmask,Amask)
      新しい((<SDL::Surface>))のインスタンスを生成する。
      ((<SDL.setVideoMode>))を呼びだした後でしか使用してはならない。

      formatとしては((<SDL::Surface>))のインスタンスを与え、指定した
      サーフィスと同じbppのサーフィスを生成する。
      
      また、[RGBA]maskを明示して指定することもできる。
      その場合は、マシンのエンディアンに注意してください。
      
      flagには以下のフラグのORを取ったものを与えることができる。

      * SDL::SWSURFACE

        システムメモリ内にサーフィスをとる。

      * SDL::HWSURFACE

        ビデオメモリ内にサーフィスを取ろうとする。

      * SDL::SRCCOLORKEY

        システムメモリかビデオメモリのうちハードウェアによる透明色機能を
        利用できるほうにサーフィスを取ろうとする。

      * SDL::SRCALPHA      

        システムメモリかビデオメモリのうちハードウェアによるアルファを利用
        できるほうにサーフィスを取ろうとする。

--- SDL::Surface.new_from(pixels,w,h,depth,pitch,Rmask,Gmask,Bmask,Amask)
      与えられたピクセルデータから((<SDL::Surface>))のインスタンスを
      作成する。

      pixelsはStringのインスタンスとして与える。pitchは各スキャンラインの
      長さ(バイト数)です。[RGBA]maskやdepthは明示的に指定しなければ
      ならない。
      
--- SDL::Surface.loadBMP(filename)
--- SDL::Surface.load_bmp(filename)
      指定されたファイル名のWindows BMP形式のファイルから((<SDL::Surface>))
      のインスタンスを作成する。
      ファイルが開けない等のエラーが生じた場合は((<SDL::Error>))例外が生じる。

--- SDL::Surface.load(filename)
      SDL_imageが必要

      指定されたファイル名の画像ファイルから((<SDL::Surface>))
      のインスタンスを作成する。
      BMP,PPX,XPM,PCX,GIF,JPEG,PNG,TGAなどをロードできる。

==== メソッド

--- SDL::Surface#saveBMP(filename)
--- SDL::Surface#save_bmp(filename)
      サーフェスの内容を指定したBMPファイルにセーブする。

--- SDL::Surface#displayFormat
--- SDL::Surface#display_format
      selfをビデオフレームバッファのピクセルフォーマットと色に合わせた
      新しいサーフェスにコピーして返す。
      新しいsurfaceを使うことによってscreenへの高速なblitができる。
      
      カラーキーとα値に対するblitのアクセラレーションを利用したいのならば、
      この関数の呼び出しに先立ってカラーキーとα値の設定を行っておく
      必要がある。

--- SDL::Surface#displayFormatAlpha
--- SDL::Surface#display_format_alpha
      ビットごとのα値が有効であることを除いて
      ((<SDL::Surface#displayFormat>))と同じ。

--- SDL::Surface#setColorKey(flag,key)
--- SDL::Surface#set_color_key(flag,key)
      blit可能なサーフェスに対してカラーキー(透明なピクセル)を設定する。

      flagにSDL::SRCCOLORKEYを指定すると、そのピクセルはblitでsrcになる
      ほうの透明ピクセルを示していることになる。
      通常はこのフラグを使う。
      
      flagにSDL::RLEACCELとORをとって指定すると、RLEを使って高速なblitを
      しようとする。

      flagが0の場合は、color keyをクリアする。

--- SDL::Surface#fillRect(x,y,w,h,color)
--- SDL::Surface#fill_rect(x,y,w,h,color)
      指定された長方形の領域をcolorでぬりつぶす。

--- SDL::Surface#setClipRect(x,y,w,h)
--- SDL::Surface#set_clip_rect(x,y,w,h)
      クリッピングをする長方形を指定する。
      ((<SDL.blitSurface>)),((<SDL::Surface#put>))等でこのインスタンスに
      描画しようとしたとき、これで指定した長方形内部のみで描画される。

--- SDL::Surface#getClipRect
--- SDL::Surface#get_clip_rect
      クリッピングの設定されている範囲を返す。
      返り値はx,y,w,hの4つの値を持つ配列である。

--- SDL::Surface#setAlpha(flag,alpha)
--- SDL::Surface#set_alpha(flag,alpha)
      アルファの設定をする。
      flagにSDL::SRCALPHAを設定することでアルファが有効になる。
      SDL::RLEACCELとORをとって指定するとRLEによる高速化が有効になる。
      alphaはアルファ値を意味し、0で透明、255で通常と同等となる。

      flagに0を指定すればアルファは無効となる。

--- SDL::Surface#h
      selfの高さを返す。

--- SDL::Surface#w
      selfの横幅を返す。

--- SDL::Surface#format
      selfのpixel formatを返す。
      詳しくは((<SDL::PixelFormat>))を参照。

--- SDL::Surface#put(image,x,y)
      selfの位置(x,y)にimageを描画する。
      ((<SDL.blitSurface>))で実装されている。

--- SDL::Surface#copyRect(x,y,w,h)
--- SDL::Surface#copy_rect(x,y,w,h)
      selfの(x,y,w,h)の長方形の部分を複製したサーフェスを生成し、
      それを返す
      
--- SDL::Surface#lock
      getPixel,setPixelやdrawLine等のメソッドを使って描画する
      ための準備をする。

      ((<SDL::Surface#mustLock?>))がtrueを返したインスタンスのみこの操作
      が必要となる。

      ((<SDL::Surface#unlock>))を呼びだすまで、他ライブラリの呼びだしや
      OSに対する操作をしてはならない。

      ((<SDL.autoLock>))がtrueを返すときはライブラリが自動的にこの操作を
      してくれるのでこのメソッドを呼びだす必要はない。

--- SDL::Surface#unlock
      ((<SDL::Surface#lock>))でロックしたのを解除する。

--- SDL::Surface#mustLock?
--- SDL::Surface#must_lock?
      ((<SDL::Surface#lock>))を呼びだす必要があるときはtrueを、
      ないときはfalseを返す。

--- SDL::Surface#getPixel(x,y) 
--- SDL::Surface#get_pixel(x,y) 
--- SDL::Surface#[](x,y)
      SGEが必要 ロックが必要

      x,yの位置のピクセルの値を返す。

--- SDL::Surface#putPixel(x,y,color)
--- SDL::Surface#put_pixel(x,y,color)
--- SDL::Surface#[]=(x,y,color)
      SGEが必要 ロックが必要

      x,yの位置のピクセルの値をpixelにする。
      つまり、x,yの位置にpixelの色の点を打つ。

--- SDL::Surface#drawLine(x1,y1,x2,y2,color)
--- SDL::Surface#draw_line(x1,y1,x2,y2,color)
      SGEが必要 ロックが必要

      色がcolorの線を(x1,y1)から(x2,y2)まで描く。

--- SDL::Surface#drawRect(x,y,w,h,color)
--- SDL::Surface#draw_rect(x,y,w,h,color)
      SGEが必要 ロックが必要

      色がcolorの長方形を描く。中はぬりつぶさない。

--- SDL::Surface#drawCircle(x,y,r,color)
--- SDL::Surface#draw_circle(x,y,r,color)
      SGEが必要 ロックが必要

      色がcolorの円を描く。中はぬりつぶさない。

--- SDL::Surface#drawFilledCircle(x,y,r,color)
--- SDL::Surface#draw_filled_circle(x,y,r,color)
      SGEが必要 ロックが必要

      色がcolorの円を描き、中をぬりつぶす。

--- SDL::Surface#drawEllipse(x,y,rx,ry,color)
--- SDL::Surface#draw_ellipse(x,y,rx,ry,color)
      SGEが必要 ロックが必要

      色がcolorの楕円を描く。中はぬりつぶさない。

--- SDL::Surface#drawFilledEllipse(x,y,rx,ry,color)
--- SDL::Surface#draw_filled_ellipse(x,y,rx,ry,color)
      SGEが必要 ロックが必要

      色がcolorの楕円を描く。中をぬりつぶす。。

--- SDL::Surface#drawEllispe(x,y,rx,ry,color)
--- SDL::Surface#draw_ellispe(x,y,rx,ry,color)
      つづりを間違えていた。使わないように。
      
--- SDL::Surface#drawFilledEllispe(x,y,rx,ry,color)
--- SDL::Surface#draw_filled_ellispe(x,y,rx,ry,color)
      つづりを間違えていた。使わないように。

--- SDL::Surface#drawAALine(x1,y1,x2,y2,color)
--- SDL::Surface#draw_aa_line(x1,y1,x2,y2,color)
      SGEが必要 ロックが必要

      色がcolorのアンチエリアスした線を(x1,y1)から(x2,y2)まで描く。
      
--- SDL::Surface#drawAACircle(x,y,r,color)
--- SDL::Surface#draw_aa_circle(x,y,r,color)
      SGEが必要 ロックが必要

      色がcolorのアンチエリアスした円を描く。
      
--- SDL::Surface#drawAAFilledCircle(x,y,r,color)
--- SDL::Surface#draw_aa_filled_circle(x,y,r,color)
      SGEが必要 ロックが必要

      色がcolorのアンチエリアスした円を描き、中をぬりつぶす。
      
--- SDL::Surface#drawAAEllipse(x,y,rx,ry,color)
--- SDL::Surface#draw_aa_ellipse(x,y,rx,ry,color)
      SGEが必要 ロックが必要

      色がcolorのアンチエリアスした楕円を描く。
      
--- SDL::Surface#drawLineAlpha(x1,y1,x2,y2,color,alpha)
--- SDL::Surface#draw_line_alpha(x1,y1,x2,y2,color,alpha)
      SGEが必要 ロックが必要

      アルファブレンドした直線を描く。
      
--- SDL::Surface#drawRectAlpha(x,y,w,h,color,alpha)
--- SDL::Surface#draw_rect_alpha(x,y,w,h,color,alpha)
      SGEが必要 ロックが必要

      アルファブレンドした長方形を描く。
      
--- SDL::Surface#drawFilledRectAlpha(x,y,w,h,color,alpha)
--- SDL::Surface#draw_filled_rect_alpha(x,y,w,h,color,alpha)
      SGEが必要 ロックが必要

      アルファブレンドした長方形を描き、中をぬりつぶす。
      
--- SDL::Surface#drawCircleAlpha(x,y,r,color,alpha)
--- SDL::Surface#draw_circle_alpha(x,y,r,color,alpha)
      SGEが必要 ロックが必要

      アルファブレンドした円を描く。
      
--- SDL::Surface#drawFilledCircleAlpha(x,y,r,color,alpha)
--- SDL::Surface#draw_filled_circle_alpha(x,y,r,color,alpha)
      SGEが必要 ロックが必要

      アルファブレンドした円を描き、中をぬりつぶす。
      
--- SDL::Surface#drawEllipseAlpha(x,y,rx,ry,color,alpha)
--- SDL::Surface#draw_ellipse_alpha(x,y,rx,ry,color,alpha)
      SGEが必要 ロックが必要

      アルファブレンドした楕円を描く。
      
--- SDL::Surface#drawFilledEllipseAlpha(x,y,rx,ry,color,alpha)
--- SDL::Surface#draw_filled_ellipse_alpha(x,y,rx,ry,color,alpha)
      SGEが必要 ロックが必要

      アルファブレンドした楕円を描き、中をぬりつぶす。
      
--- SDL::Surface#drawAALineAlpha(x1,y1,x2,y2,color,alpha)
--- SDL::Surface#draw_aa_line_alpha(x1,y1,x2,y2,color,alpha)
      SGEが必要 ロックが必要

      アルファブレンド、アンチエリアスした直線を描く。
      
--- SDL::Surface#drawAACircleAlpha(x,y,r,color,alpha)
--- SDL::Surface#draw_aa_circle_alpha(x,y,r,color,alpha)
      SGEが必要 ロックが必要

      アルファブレンド、アンチエリアスした円を描く。
      
--- SDL::Surface#drawAAEllipseAlpha(x,y,rx,ry,color,alpha)
--- SDL::Surface#draw_aa_ellipse_alpha(x,y,rx,ry,color,alpha)
      SGEが必要 ロックが必要

      アルファブレンド、アンチエリアスした楕円を描く。

--- SDL::Surface#drawBezier(x1,y1,x2,y2,x3,y3,x4,y4,level,color)
--- SDL::Surface#draw_bezier(x1,y1,x2,y2,x3,y3,x4,y4,level,color)
      SGEが必要 ロックが必要

      (x1,y1)から(x4,y4)へのベジエ曲線を(x2,y2),(x3,y3)をコントロール
      ポイントとしてcolorで指定した色で描く。levelは4から7くらいが普通。
      
--- SDL::Surface#drawAABezier(x1,y1,x2,y2,x3,y3,x4,y4,level,color)
--- SDL::Surface#draw_aa_bezier(x1,y1,x2,y2,x3,y3,x4,y4,level,color)
      SGEが必要 ロックが必要

      (x1,y1)から(x4,y4)へのアンチエイリアスしたベジエ曲線を(x2,y2),
      (x3,y3)をコントロールポイントとしてcolorで指定した色で描く。
      levelは4から7くらいが普通。
      
--- SDL::Surface#drawBezierAlpha(x1,y1,x2,y2,x3,y3,x4,y4,level,color,alpha)
--- SDL::Surface#draw_bezier_alpha(x1,y1,x2,y2,x3,y3,x4,y4,level,color,alpha)
      SGEが必要 ロックが必要

      (x1,y1)から(x4,y4)へのベジエ曲線を(x2,y2),
      (x3,y3)をコントロールポイントとしてcolorで指定した色、alphaで指定した
      アルファ値で描く。levelは4から7くらいが普通。

--- SDL::Surface#drawAABezierAlpha(x1,y1,x2,y2,x3,y3,x4,y4,level,color,alpha)
--- SDL::Surface#draw_aa_bezier_alpha(x1,y1,x2,y2,x3,y3,x4,y4,level,color,alpha)
      SGEが必要 ロックが必要

      (x1,y1)から(x4,y4)へのアンチエイリアスしたベジエ曲線を(x2,y2),
      (x3,y3)をコントロールポイントとしてcolorで指定した色、alphaで指定した
      アルファ値で描く。levelは4から7くらいが普通。

--- SDL::Surface#rotateScaledSurface(angle,scale,bgcolor)
--- SDL::Surface#rotate_scaled_surface(angle,scale,bgcolor)
      SGEが必要 

      これは、selfをangle度傾け、scale倍した画像を持つSurfaceのインスタンスを
      生成するメソッドである。回転によって生じる隙間はbgcolorで埋められる。

      このメソッドは古いためあまり使うべきではない。
      ((<SDL::Surface#transformSurface>))を使ったほうがよい。

--- SDL::Surface#rotateSurface(angle,bgcolor)
--- SDL::Surface#rotate_surface(angle,bgcolor)
      ((<SDL::Surface#rotateScaledSurface>))と同様。
      ただしscaleは1としたことになる。

--- SDL::Surface#transformSurface(bgcolor,angle,xscale,yscale,flags)
--- SDL::Surface#transform_surface(bgcolor,angle,xscale,yscale,flags)
      selfをangle度回転し、X方向にxscale倍、Y方向にyscale倍して、生じた
      すきまをbgcolorで塗りつぶした画像を持つDSL::Surfaceのインスタンス
      を生成するメソッド。
      flagは((<SDL.transform>))と同じ。

--- SDL::Surface#mapRGB(r,g,b)
--- SDL::Surface#map_rgb(r,g,b)
      selfのサーフィスのフォーマット(bppなど)に従ってr,g,bによって
      あらわされる色に対応したpixelの値を返す。

--- SDL::Surface#mapRGBA(r,g,b,a)
--- SDL::Surface#map_rgba(r,g,b,a)
      ((<SDL::Surface#mapRGB>))と同様。ただしアルファ値も含めることができる。

--- SDL::Surface#getRGB(pixel)
--- SDL::Surface#get_rgb(pixel)
      ((<SDL::Surface#mapRGB>))と逆の変換をする。返り値は [r,g,b]
      という内容の配列を返す。

--- SDL::Surface#getRGBA(pixel)
--- SDL::Surface#get_rgba(pixel)
      ((<SDL::Surface#getRGB>))と同様。ただし返り値にアルファも含んでいる。
      返り値は[r,g,b,a]という内容の配列である。

--- SDL::Surface#bpp
      サーフィスのフォーマットの1ピクセルあたりのビット数を返す。

--- SDL::Surface#colorkey
      サーフィスに設定されたカラーキーの値を返す。

--- SDL::Surface#alpha
      サーフィスに設定されたアルファ値を返す。

--- SDL::Surface#flags
      サーフィスに設定されたフラグを返す。

--- SDL::Surface#Rmask
--- SDL::Surface#Gmask
--- SDL::Surface#Bmask
--- SDL::Surface#Amask
      サーフェスの[RGBA]maskを返す。

--- SDL::Surface#pixels
      サーフェスのメモリイメージを文字列として返す。
      
--- SDL::Surface#setPalette(flag,colors,firstcolor)
--- SDL::Surface#set_palette(flag,colors,firstcolor)
      8bppのサーフェスにパレットを設定する。
      
      ((<SDL.setVideoMode>))でflagにSDL::HWPALETTE、bppに8を指定して得た
      スクリーンサーフィスには、2つのパレットがある。一方は論理パレットで
      ((<SDL.blitSurface>))などで画像を転送するときに用いられる。
      他方は物理パレットで、実際に画面に表示されるときの色を決定する。

      flagに SDL::LOGPALを指定すると論理パレットを、SDL::PHYSPALを指定すると
      物理パレットを変更する。両方のORを取ると、両方変更する。

      実際のパレットの値の設定の仕方は以下の通りである。
      0から255のうちXからYまでを変更したいとする。
      まずcolorsにはY-X+1の要素を持つ配列を指定する。
      その各々の要素は3つの要素を持った配列を入れる。
      それにはr,g,bの値を入れ色を指定する。そしてfirstcolorにはXを指定する。
      
      パレットの変更が成功したときはtrue、失敗したときはfalseを返す。

--- SDL::Surface#setColors(colors,firstcolor)
--- SDL::Surface#set_colors(colors,firstcolor)
      ((<SDL::Surface#setColors>))のflagにSDL::LOGPAL|SDL::PHYSPALを指定
      するのと同じ。

--- SDL::Surface#getPalette
--- SDL::Surface#get_palette
      パレットを配列で返す。その内容は以下の様になっている。
        [ [r0,g0,b0],[r1,g1,b1], ... ,[r255,g255,b255] ]
      サーフィスがパレットを持っていないときはnilを返す。

--- SDL::Surface#makeCollisionMap
      SGEが必要
      
      collision map を生成する。 あらかじめ((<SDL::Surface#setColorKey>))
      を呼んでおく必要がある。((<SDL::Surface#setColorKey>))で設定された
      不透明部分が衝突判定に利用される。
      
      ((<SDL::CollisionMap>))のインスタンスを返す。


=== SDL::Screen

ここにかきこまれた画像が画面に表示される。
このクラスはただ一つしか生成できないようになっていて、
((<SDL.setVideoMode>))によってのみ生成される。
実際には、このようなクラスは存在せず、((<SDL::Surface>))に以下の特異
メソッドを追加したオブジェクトである。

==== スーパークラス

((<SDL::Surface>))

==== クラスメソッド


==== メソッド

--- SDL::Screen#updateRect(x,y,w,h)
--- SDL::Screen#update_rect(x,y,w,h)
    この関数を呼び出すと、与えられた画面上の指定された長方形領域のリストが
    確実に更新される。
    x、y、w、hがすべて0の場合、全画面を更新する。画面がロックされてい
    るときにはこの関数を呼び出さないようにする。

--- SDL::Screen#flip
      ダブルバッファをサポートしているハードウェア上では、この関数は
      バッファの交換を要求して返る。ハードウェアによって次の垂直帰線期間まで
      待ってから、次のビデオサーフェスへのblitやロック操作の呼び出しが返る前
      にビデオバッファの交換が行われる。ダブルバッファをサポートしない
      ハードウェア上では、この呼び出しは((<SDL::Screen#updateRect>))(0,0,0,0)
      としているのと同じである。このメソッドを使用してハードウェアによる画面の
      交換を行うためには、((<SDL.setVideoMode>))の引数でDOUBLEBUFフラグを設
      定しておくことが必要である。

=== SDL::PixelFormat

このクラスの機能はすべて((<SDL::Surface>))にうつされた。そちらを使用したほうが
よい。このクラスは互換性のために残してある。

SDL_PixelFormatのラッパークラス。
((<SDL::Surface#format>))で取得できる。

SDLでは、16bit colorのsurfaceと32bitのsurfaceというように複数の画像の形式が
共存できる。よってその画像を操作するため、その形式に関する情報が
必要となる。PixelFormatのインスタンスが表しているものはそれである。

通常色を表すためにはr,g,bの値が使われるが、それをsurfaceの内部形式に従った
ひとつの値にするためにこれを用いる。逆の変換もできる。

このライブラリ内ではこれによって指定された値をもちいて色を指定する。

また、配列を用いて色を表すこともできる。これは r,g,b の値を
[r,g,b]で表すものである。

==== スーパークラス

Object

==== クラスメソッド

なし

==== メソッド

--- SDL::PixelFormat#mapRGB(r,g,b)
      selfのフォーマットに従ってr,g,bによってあらわされる色に対応した
      pixelの値を返す。

--- SDL::PixelFormat#mapRGBA(r,g,b,a)
      ((<SDL::PixelFormat#mapRGB>))と同様。ただしアルファ値も含めることができる。

--- SDL::PixelFormat#getRGB(pixel)
      ((<SDL::PixelFormat#mapRGB>))と逆の変換をする。返り値は [r,g,b]
      という内容の配列を返す。

--- SDL::PixelFormat#getRGBA(pixel)
      ((<SDL::PixelFormat#getRGB>))と同様。ただし返り値にアルファも含んでいる。
      返り値は[r,g,b,a]という内容の配列である。

--- SDL::PixelFormat#bpp
      フォーマットの1ピクセルあたりのビット数を返す。

--- SDL::PixelFormat#colorkey
      Not documented yet

--- SDL::PixelFormat#alpha
      Not documented yet

=== SDL::CollisionMap

SGEが必要

1ドットごとの衝突判定をするための情報を表わすクラス。
これでふたつの画像が重なっているかどうかを簡単に判定できる。

((<SDL::Surface#makeCollisionMap>)) によってのみインスタンスが得られる。

==== クラスメソッド

--- SDL::CollisionMap#boundingBoxCheck(x1, y1, w1, h1, x2, y2, w2, h2)
      ふたつの長方形が重なっているかどうかを判定し、重なっていれば
      真を、いなければ偽を返す。

==== method

--- SDL::CollisionMap#collisionCheck(x1, y1, collisionMap, x2, y2)
      self が (x1,y1) に描画され、collisionMapが (x2,y2) に描画された
      としたとき、そのふたつの画像の不透明部分が重なるかどうかを
      判定する。

      内部で自動的に((<SDL::CollisionMap#boundingBoxCheck>))を呼ぶ。

--- SDL::CollisionMap#boundingBoxCheck(x1, y1, collisionMap, x2, y2)
      ふたつの長方形が重なっているかどうかを判定する。

--- SDL::CollisionMap#clear(x1, y1, w, h)
      指定した長方形の部分を判定なしの状態にする。

--- SDL::CollisionMap#set(x1, y1, w, h)
      指定した長方形の部分をすべて判定ありの状態にする。

== Event関連

=== SDL::Event

イベントをとりあつかうクラス

==== スーパークラス

Object

==== クラスメソッド

--- SDL::Event.new
      新しい((<SDL::Event>))のオブジェクトを生成する。

--- SDL::Event.appState
--- SDL::Event.app_state
      現在のアプリケーションの状態を返す。返値は以下の値のORをとったもの。
        SDL::Event::APPMOUSEFOCUS
        SDL::Event::APPINPUTFOCUS
        SDL::Event::APPACTIVE

--- SDL::Event.enableUNICODE
--- SDL::Event.enable_unicode
      イベント処理時にキー入力からUCSでの表現を生成する機能を有効にする。
      デフォルトでは無効になっている。
      SDLSKKの機能を利用するときにはこれを有効にする必要がある。
      
--- SDL::Event.disableUNICODE
--- SDL::Event.disable_unicode
      イベント処理時にキー入力からUCSでの表現を生成する機能を無効にする。
      
--- SDL::Event.enableUNICODE?
--- SDL::Event.enable_unicode?
      イベント処理時にキー入力からUCSでの表現を生成する機能が有効であるか
      どうかを返す。

==== メソッド

--- SDL::Event#poll
      現在イベントキュー内で処理待ちしているイベントがないかをしらべ、
      ひとつでもあれば1を、ひとつもなければ0を返す。
      また、処理待ちをしているイベントがあれば、その情報をselfに格納する。

--- SDL::Event#wait
      次のイベントが来るまで待ち、来れば1を、またイベントを待つ間にエラー
      が生じた場合は0を返す。そしてその情報をselfに格納する。

--- SDL::Event#type
      格納されているイベントがいかなる種類のものであるかを返す。
      その種類は以下の定数で示される。
      
        SDL::Event::ACTIVEEVENT 
        SDL::Event::KEYDOWN
        SDL::Event::KEYUP
        SDL::Event::MOUSEMOTION
        SDL::Event::MOUSEBUTTONDOWN
        SDL::Event::MOUSEBUTTONUP
        SDL::Event::JOYAXISMOTION
        SDL::Event::JOYBALLMOTION
        SDL::Event::JOYHATMOTION
        SDL::Event::JOYBUTTONDOWN
        SDL::Event::JOYBUTTONUP
        SDL::Event::QUIT
        SDL::Event::SYSWMEVENT
        SDL::Event::VIDEORESIZE

--- SDL::Event#info
      イベントの情報を配列で返す。
      このメソッドは、これ以下のメソッドをすべて代用できる。

--- SDL::Event#keyPress?
--- SDL::Event#key_press?
      キーイベントでキーが押し下げられていればtrueを、いなければfalseを返す。

--- SDL::Event#keySym
--- SDL::Event#key_sym
      キーイベントで押し下げ/上げられたキーをを返す。

--- SDL::Event#keyMod
--- SDL::Event#key_mod
      キーイベントでの修飾キー(SHIFT,CTRLなど)の状態を返す。

--- SDL::Event#gain?
      ACTIVEEVENTイベントでウィンドウがフォーカスを得たならtrueを、
      失なったならばfalseを返す。

--- SDL::Event#appState
--- SDL::Event#app_state
      ACTIVEEVENTイベントでのイベントの種類を返す。
      その内容は以下のいずれか。
        SDL::Event::APPMOUSEFOCUS
        SDL::Event::APPINPUTFOCUS
        SDL::Event::APPACTIVE

--- SDL::Event#mouseX
--- SDL::Event#mouse_x
      マウスイベントでのマウスカーソルのX座標を返す。

--- SDL::Event#mouseY
--- SDL::Event#mouse_y
      マウスイベントでのマウスカーソルのY座標を返す。      

--- SDL::Event#mouseXrel
--- SDL::Event#mouse_xrel
      マウスイベントでのマウスカーソルのX座標の変化量を返す。

--- SDL::Event#mouseYrel
--- SDL::Event#mouse_yrel
      マウスイベントでのマウスカーソルのX座標の変化量を返す。

--- SDL::Event#mouseButton
--- SDL::Event#mouse_button
      マウスイベントでどのボタンのイベントであるかをかえす。
      それは以下の定数でしめされる。

        SDL::Mouse::BUTTON_LEFT  左ボタン
        SDL::Mouse::BUTTON_MIDDLE  中ボタン
        SDL::Mouse::BUTTON_RIGHT 右ボタン

--- SDL::Event#mousePress?
--- SDL::Event#mouse_press?
      MOUSEBUTTONDOWN,MOUSEBUTTONUPイベントにおいて、マウスボタンが
      押されたならtrue、離されたならfalseを返す。

=== SDL::Event2
イベントを取り扱うためのクラスその2。
こちらのクラスのほうが((<SDL::Event>))より使いやすいでしょう。

==== super class

Object

==== class method

--- SDL::Event2.poll
    現在イベントキュー内で処理待ちしているイベントがないかをしらべ、
    ひとつでもあればそのイベントに対応するクラスのインスタンスを返す。
    ひとつもなければnilを返す。
    返すインスタンスに対応するクラスは以下の通り。
      SDL::Event2::Active
      SDL::Event2::KeyDown
      SDL::Event2::KeyUp
      SDL::Event2::MouseMotion
      SDL::Event2::MouseButtonDown
      SDL::Event2::MouseButtonUp
      SDL::Event2::JoyAxis
      SDL::Event2::JoyBall
      SDL::Event2::JoyHat
      SDL::Event2::JoyButtonUp
      SDL::Event2::JoyButtonDown
      SDL::Event2::Quit
      SDL::Event2::SysWM
      SDL::Event2::VideoResize
    これらのクラスはすべてSDL::Event2のサブクラスである。
    
--- SDL::Event2.wait
    次のイベントが来るまで待ち、来ればそのイベントに対応するクラスの
    インスタンスを返す。

--- SDL::Event2.push(event)
      Not documented yet

--- SDL::Event2.new
      Not documented yet

--- SDL::Event2.appState
--- SDL::Event2.app_state
      ((<SDL::Event.appState>))と同じ。

--- SDL::Event2.enableUNICODE
--- SDL::Event2.enable_unicode
      ((<SDL::Event.enableUNICODE>))と同じ
      
--- SDL::Event2.disableUNICODE
--- SDL::Event2.disable_unicode
      ((<SDL::Event2.disableUNICODE>))と同じ
      
--- SDL::Event2.enableUNICODE?
--- SDL::Event2.enable_unicode?
      ((<SDL::Event.enableUNICODE?>))と同じ
      
==== method

なし。

=== SDL::Event2のサブクラス
SDL::Event2.poll,SDL::Event2.waitはSDL::Event2のサブクラスのインスタンスを返します。
そのクラスは以下の通りである。

==== SDL::Event2::Active
ウィンドウ内のマウス/キーボードのフォーカスの出入りによって生じるイベント。
+ メソッド
--- SDL::Event2::Active#gain
      フォーカスを得たならtrue、フォーカスを失ったならfalse。
--- SDL::Event2::Active#state
      イベントの種類を返す。
        SDL::Event::APPMOUSEFOCUS マウスフォーカス
        SDL::Event::APPINPUTFOCUS キーボードフォーカス
        SDL::Event::APPACTIVE アイコン化/アイコン化解除

==== SDL::Event2::KeyDown
キーの押しさげで生じるイベント。
+ メソッド
--- SDL::Event2::KeyDown#press
      つねにtrue
--- SDL::Event2::KeyDown#sym
      押したキーの種類。SDL::Key::ESCAPEなど。
--- SDL::Event2::KeyDown#mod
      ((<SDL::Key.modState>))と同じ。
--- SDL::Event2::KeyDown#unicode
      変換済みのキーボード入力。利用するためには
      ((<SDL::Event2.enableUNICODE>))をあらかじめ呼んでおく必要がある。
      
==== SDL::Event2::KeyUp
キーを離したときに生じるイベント。
--- SDL::Event2::KeyUp#press
      つねにfalse
--- SDL::Event2::KeyUp#sym
      離されたキーの種類。SDL::Key::ESCAPEなど。
--- SDL::Event2::KeyUp#mod
      ((<SDL::Key.modState>))と同じ。

==== SDL::Event2::MouseMotion
マウスを動かしたときに生じるイベント。((<SDL::Mouse.warp>))でもこの
イベントが生じる。
+ メソッド
--- SDL::Event2::MouseMotion#state
      マウスのボタンの状態
--- SDL::Event2::MouseMotion#x
      マウスカーソルのx座標
--- SDL::Event2::MouseMotion#y
      マウスカーソルのy座標
--- SDL::Event2::MouseMotion#xrel
      マウスカーソルのx座標の変位
--- SDL::Event2::MouseMotion#yrel
      マウスカーソルのy座標の変位

==== SDL::Event2::MouseButtonDown
マウスのボタンを押し下げたときに生じるイベント。
+ メソッド
--- SDL::Event2::MouseButtonDown#button
      どのボタンを押したのかを返す。
        SDL::Mouse::BUTTON_LEFT
        SDL::Mouse::BUTTON_MIDDLE
        SDL::Mouse::BUTTON_RIGHT

--- SDL::Event2::MouseButtonDown#press
      常にtrue
--- SDL::Event2::MouseButtonDown#x
      マウスカーソルのx座標
--- SDL::Event2::MouseButtonDown#y
      マウスカーソルのy座標

==== SDL::Event2::MouseButtonUp
マウスのボタンを離したときに生じるイベント。
+ メソッド
--- SDL::Event2::MouseButtonUp#button
      どのボタンを離したのかを返す。
        SDL::Mouse::BUTTON_LEFT
        SDL::Mouse::BUTTON_MIDDLE
        SDL::Mouse::BUTTON_RIGHT

--- SDL::Event2::MouseButtonUp#press
      常にfalse
--- SDL::Event2::MouseButtonUp#x
      マウスカーソルのx座標
--- SDL::Event2::MouseButtonUp#y
      マウスカーソルのy座標

==== SDL::Event2::JoyAxis
アナログスティックを動かしたときに生じるイベント。
((<SDL::Joystick>))の内容も参考になると思われる。
+ メソッド
--- SDL::Event2::JoyAxis#which
      どのジョイスティックのものなのかを示す。
--- SDL::Event2::JoyAxis#axis
      どのアナログスティックのものなのかを示す。
--- SDL::Event2::JoyAxis#value
      アナログスティックの変量を示す(-32768 〜  32767)。
==== SDL::Event2::JoyBall
トラックボールを動かしたときに生じるイベント。
+ メソッド
--- SDL::Event2::JoyBall#which
      どのジョイスティックのものなのかを示す。
--- SDL::Event2::JoyBall#ball
      どのボールのものなのかを示す。
--- SDL::Event2::JoyBall#xrel
--- SDL::Event2::JoyBall#yrel
      トラックボールのx/y軸の変量

==== SDL::Event2::JoyHat
十字キーの入力があったときに生じるイベント。
--- SDL::Event2::JoyHat#which
      どのジョイスティックのものなのかを示す。
--- SDL::Event2::JoyHat#hat
      どの十字キーのものなのかを示す。      
--- SDL::Event2::JoyHat#value
      キーの入力状態。内容は以下の通り。
        SDL::Joystick::HAT_CENTERED
        SDL::Joystick::HAT_UP
        SDL::Joystick::HAT_RIGHT
        SDL::Joystick::HAT_DOWN
        SDL::Joystick::HAT_LEFT
        SDL::Joystick::HAT_RIGHTUP
        SDL::Joystick::HAT_RIGHTDOWN
        SDL::Joystick::HAT_LEFTUP
        SDL::Joystick::HAT_LEFTDOWN

==== SDL::Event2::JoyButtonUp
ジョイスティックのボタンが離されたときに生じるイベント。
--- SDL::Event2::JoyButtonUp#which
      どのジョイスティックのものなのかを示す。
--- SDL::Event2::JoyButtonUp#button
      どのボタンのものなのかを示す。
--- SDL::Event2::JoyButtonUp#press
       常にfalse

==== SDL::Event2::JoyButtonDown
ジョイスティックのボタンが押し下げられたときに生じるイベント。
--- SDL::Event2::JoyButtonDown#which
      どのジョイスティックのものなのかを示す。
--- SDL::Event2::JoyButtonDown#button
      どのボタンのものなのかを示す。
--- SDL::Event2::JoyButtonDown#press
       常にtrue

==== SDL::Event2::Quit
アプリケーションを終了しようとしたとき、つまりウィンドウの終了ボタンを
押したときなどに生じるイベント。
==== SDL::Event2::SysWM
プラットフォームに依存したウィンドウ関係のイベント。
このメソッドからその情報を取りだす手段は今のところ用意されていない。
==== SDL::Event2::VideoResize
ウィンドウの大きさを変えたときに生じるイベント。
((<SDL.setVideoMode>))のflagsにSDL::RESIZABLEを与えたときのみこのイベント
が生じる。
+ メソッド
--- SDL::Event2::VideoResize#w
      変更後のウィンドウ幅
--- SDL::Event2::VideoResize#h
      変更後のウィンドウの高さ。

=== SDL::Key

キーボードのキーに対応する定数を定義しているモジュール
キーボードのキーの状態を知るための関数もこの中にある。

==== モジュール関数

--- SDL::Key.scan
      キーボードの状態をスキャンします

--- SDL::Key.press?(key)
      これを呼び出す前にscanを呼びだしてください。
      scan で得た状態を得ます。trueで押している、falseで離しているです。

--- SDL::Key.modState
--- SDL::Key.mod_state
      修飾キー(CTRL,ATL,など)の状態を返す。
      返り値は以下の定数でORをとったもので表される。
        SDL::Key::MOD_NONE
        SDL::Key::MOD_LSHIFT
        SDL::Key::MOD_RSHIFT
        SDL::Key::MOD_LCTRL
        SDL::Key::MOD_RCTRL
        SDL::Key::MOD_LALT
        SDL::Key::MOD_RALT
        SDL::Key::MOD_LMETA
        SDL::Key::MOD_RMETA
        SDL::Key::MOD_NUM
        SDL::Key::MOD_CAPS
        SDL::Key::MOD_MODE
        SDL::Key::MOD_RESERVED
        SDL::Key::MOD_CTRL = SDL::Key::MOD_LCTRL|SDL::Key::MOD_RCTRL
        SDL::Key::MOD_SHIFT = SDL::Key::MOD_LSHIFT|SDL::Key::MOD_RSHIFT
        SDL::Key::MOD_ALT = SDL::Key::MOD_LALT|SDL::Key::MOD_RALT
        SDL::Key::MOD_META = SDL::Key::MOD_LMETA|SDL::Key::MOD_RMETA

--- SDL::Key.enableKeyRepeat(delay,interval)
--- SDL::Key.enable_key_repeat(delay,interval)
      キーリピートの設定を変える。
      

--- SDL::Key.disableKeyRepeat
--- SDL::Key.disable_key_repeat
      キーリピートを無効にする。
      
--- SDL::Key.getKeyName(key)
--- SDL::Key.get_key_name(key)
      与えたキーに対する名前を表わす文字列を返します。
      
=== SDL::Mouse

マウス関連の定数と関数を定義しているモジュール

==== モジュール関数

--- SDL::Mouse.state
      マウスの状態を配列の形で返します。
      配列の内容は
        [ x , y , pressLButton? , pressMButton? , pressRButton? ]
      となっています。

--- SDL::Mouse.warp(x,y)
      マウスカーソルの位置を設定する（マウス移動のイベントを生成する)。

--- SDL::Mouse.show
      マウスカーソルを表示する。

--- SDL::Mouse.hide
      マウスカーソルを消す。

--- SDL::Mouse.setCursor(bitmap,white,black,transparent,inverted,hot_x=0,hot_y=0)
--- SDL::Mouse.set_cursor(bitmap,white,black,transparent,inverted,hot_x=0,hot_y=0)
      マウスカーソルを変える。
      bitmapとして((<SDL::Surface>))のインスタンスを与える。
      カーソルの色は白黒で生成される。
      white,black,transparent,invertedはそのサーフィス内で、どの
      ピクセルがカーソルの白、黒、透明、反転にあたるかを示す。

== audio関連

=== SDL::Mixer

音をだしたりするのに使うモジュール
ボリュームは0から128が有効である。
このモジュールの機能を使うためには、SDL_mixerライブラリが必要である。
このモジュール内の機能を使うためには、((<SDL.init>))でSDL::INIT_AUDIOを
有効にしなければならない。

==== モジュール関数

--- SDL::Mixer.open(frequency=Mixer::DEFAULT_FREQUENCY,format=Mixer::DEFAULT_FORMAT,cannels=Mixer::DEFAULT_CHANNELS,chunksize=4096)
      このモジュールの機能の初期化関数。
      frequencyは周波数、formatはサウンドの形式、
      channelsは1でモノラル、2でステレオ
      chunksizeはバッファの大きさ、をそれぞれ指定する。
      chunksizeは2の階乗を使うようにする。
      ここでいうchannelsとplayChannelなどでのchannelは別物である。

--- SDL::Mixer.spec
      初期化したオーディオの性能を配列で返す。
      その内容は、
        [ rate,format,channels ]

--- SDL::Mixer.allocateChannels(numchannels)
--- SDL::Mixer.allocate_channels(numchannels)
      Ruby/SDLで利用できるチャンネルの数を動的に変更する。
      もし指定したチャンネルの数が指定まえのものより小さければ
      それより上のチャンネルでの再生は止まる。
      
      これは新しく確保できたチャンネルの数を返す。

--- SDL::Mixer.playChannel(channel,wave,loop)
--- SDL::Mixer.play_channel(channel,wave,loop)
      指定したchannelでwaveを演奏する。
      channelに-1を指定すると、あいているchannelが適当にえらばれる。
      loops指定した回数繰り返す。
      loopsが-1のときは際限なくくりかえす。
      loopsが0のときは一度のみ演奏する。

      どのチャンネルを演奏に利用したかを返す。

--- SDL::Mixer.play?(channel)
      指定したchannelが現在演奏していればtrueを、していなければ
      falseを返す。

--- SDL::Mixer.setVolume(channel,volume)
--- SDL::Mixer.set_volume(channel,volume)
      指定したchannelのボリュームを設定する。
      channel=-1を指定するとすべてのchannelに対しボリュームを指定する。

      volume=-1とすると、現在のボリュームが返る。

--- SDL::Mixer.halt(channel)
      指定したchannelの演奏を止める。

--- SDL::Mixer.pause(chennel)
      指定したchannelの演奏を一時停止する。

--- SDL::Mixer.resume(channel)
      指定した一時停止しているchannelの演奏を再開する。

--- SDL::Mixer.pause?(channel)
      指定したchannelが一時停止していればtrue、していなければfalseを
      返す。

--- SDL::Mixer.playMusic(music,loops)
--- SDL::Mixer.play_music(music,loops)
      musicで指定した音楽を演奏する。
      loopsは((<SDL::Mixer.playChannel>))と同じ。

--- SDL::Mixer.fadeInMusic(music,loops,ms)
--- SDL::Mixer.fade_in_music(music,loops,ms)
      musicで指定した音楽をフェードインして演奏する。
      loopsは((<SDL::Mixer.playChannel>))と同じ。
      フェードインはmsは指定したミリ秒だけかける

--- SDL::Mixer.setVolumeMusic(volume)
--- SDL::Mixer.set_volume_music(volume)
      音楽のボリュームを指定する。

--- SDL::Mixer.haltMusic
--- SDL::Mixer.halt_music
      音楽を止める。

--- SDL::Mixer.fadeOutMusic(ms)
--- SDL::Mixer.fade_out_music(ms)
      音楽を指定したミリ秒かけてフェードアウトする。

--- SDL::Mixer.pauseMusic
--- SDL::Mixer.pause_music
      音楽を一時停止する。
      
--- SDL::Mixer.resumeMusic
--- SDL::Mixer.resume_music
      一時停止している音楽の再生を再開する。

--- SDL::Mixer.rewindMusic
--- SDL::Mixer.rewind_music
      音楽の再生位置を一番最初にする。

--- SDL::Mixer.pauseMusic?
--- SDL::Mixer.pause_music?
      音楽が一時停止していればtrue、いなければfalseを返す。

--- SDL::Mixer.playMusic?
--- SDL::Mixer.play_music?
      音楽が演奏されていればtrue、していなければfalseを返す。

=== SDL::Mixer::Wave

Waveをあらわすクラス

==== スーパークラス

Object

==== クラスメソッド

--- SDL::Mixer::Wave.load(filename)
      waveファイルをロードし、それに対応するSDL::Mixer::Waveクラスの
      インスタンスを返す。

==== メソッド

--- SDL::Mixer::Wave#setVolume(volume)
--- SDL::Mixer::Wave#set_volume(volume)
      selfのボリュームを返す。

=== SDL::Mixer::Music

音楽(.mod .s3m .it .xm .mid .mp3 .ogg)を表す。
ただしmidiファイルやOggVorbis、MP3を演奏するためにはそのための設定が必要。

==== スーパークラス

Object

==== クラスメソッド

--- SDL::Mixer::Music.load(filename)
      音楽(.mod .s3m .it .xm .mid .mp3)をファイルからロードし、
      そのデータに対応するMixer::Musicクラスのインスタンスを返す。

== Window Manager 関連

=== SDL::WM

Window関連の処理をまとめたモジュール

==== モジュール関数

--- SDL::WM.caption
      captionの文字列を配列で返してくる。
      内容は、
        [ ウィンドウのタイトル , アイコンのタイトル ]

--- SDL::WM.setCaption(title,icon)
--- SDL::WM.set_caption(title,icon)
      上記の内容を変更する。

--- SDL::WM.icon=(iconImage)
--- SDL::WM.icon=(icon_image)
      ウィンドウのアイコンの絵を指定する。
      setVideoModeの呼びだし前に呼びださなければならない。
      
--- SDL::WM.iconify
      ウィンドウのアイコン化、最小化をする。
      成功すれば、SDL::Event::APPACTIVEイベントが生じる。

--- SDL::Screen#toggleFullScreen
--- SDL::Screen#toggle_fullscreen
      フルスクリーンモードをきりかえる。
      
== CDROM関係

=== SDL::CD

CDROMドライブを表すクラス

CD#numTrack等の情報はCD#statusを呼びだすことによって更新される。

ここではCDの位置、演奏時間の長さを表すためにフレームという単位を用いる。
1frame=2Kであり、
通常の音楽CDにおいて75フレーム=1秒である。

==== スーパークラス

Object

==== クラスメソッド

--- SDL::CD.numDrive
--- SDL::CD.num_drive
      いくつのCDROMドライブが使用できるかを返す。

--- SDL::CD.indexName(drive)
--- SDL::CD.index_name(drive)
      指定したドライブの名前を文字列で返す。
      ドライブの指定は0からCD.numDrive-1の整数で指定する。

--- SDL::CD.open(drive)
      指定したドライブを開く。
      成功すればCDのインスタンスが返る。
      ドライブの指定は0からCD.numDrive-1の整数で指定する。
      0ドライブがデフォルトのドライブである。

==== メソッド

--- SDL::CD#status
      currentTrack,currentFrame,numTracks,trackType,trackLenght
      の情報を更新する。
      現在のCDの状態を返す。その内容は以下のとおり。
        TRAYEMPTY
        STOPPED
        PLAYING
        PAUSED
        ERROR

--- SDL::CD#play(start,length)
      CDをstartフレームからlengthフレームの間演奏する。

--- SDL::CD#playTrack(start_track,start_frame,ntracks,nframes)
--- SDL::CD#play_track(start_track,start_frame,ntracks,nframes)
      CDをstart_trackのstart_frameから、ntracks先のトラックのnframeのところ
      まで演奏する。
      なお、このライブラリ内ではトラックのインデックスは0からはじまる。
      このメソッドは((<SDL::CD#status>))を呼びだしたあとに呼びださな
      ければならない。

        例
        cd.playTrack(0,0,1,0) # 最初のトラックを演奏する。
        cd.playTrack(1,0,0,SDL::CD::FPS*15) # 2トラック目を最初から15秒演奏する。

--- SDL::CD#pause
      CDの演奏を一時停止する。

--- SDL::CD#resume
      CDの演奏を再開する。

--- SDL::CD#stop
      CDの演奏を止める。

--- SDL::CD#eject
      CDをイジェクトする。

--- SDL::CD#numTracks
--- SDL::CD#num_tracks
      CDのトラック数を返す。

--- SDL::CD#currentTrack
--- SDL::CD#current_track
      現在演奏しているトラックを返す。

--- SDL::CD#currentFrame
--- SDL::CD#current_frame
      現在演奏している位置をフレーム数で返す。
      この値は現在のトラックの最初からの値である。

--- SDL::CD#trackType(track)
--- SDL::CD#track_type(track)
      指定したトラックがなんであるかを返す。その値は以下のとおり。
        SDL::CD::AUDIO_TRACK
        SDL::CD::DATA_TRACK

--- SDL::CD#trackLength(track)
--- SDL::CD#track_length(track)
      指定したトラックの長さをフレーム数で返す。

== ジョイスティック関連

=== SDL::Joystick

一つのジョイスティックを表すクラス

==== スーパークラス

Object

==== クラスメソッド

--- SDL::Joystick.pall
      イベントのpollingに合わせて、((<SDL::Joystick.updateAll>))を呼び
      だすかどうかを得る。
      
--- SDL::Joystick.pall=(polling)
      イベントのpollingに合わせて、((<SDL::Joystick.updateAll>))を呼びだす
      かどうかを設定する。またこれをfalseにすると((<SDL::Event#poll>))
      などからジョイスティックの情報を得ることができなくなる。
      これはデフォルトではtrueに設定されている。これは変更しないことを
      推奨する。

--- SDL::Joystick.num
      利用可能なジョイスティックの数を返す。

--- SDL::Joystick.indexName(index)
--- SDL::Joystick.index_name(index)
      指定したジョイスティックの名前を文字列で返す。
      0からJoystick.num-1の整数で指定する。

--- SDL::Joystick.open(index)
      指定したジョイスティックを開く。
      成功するとJoystickのインスタンスが返ってくる。

--- SDL::Joystick.open?(index)
      指定したジョイスティックがすでに開かれているかを返す。

--- SDL::Joystick.updateAll
--- SDL::Joystick.update_all
      全てのジョイスティックの情報を更新する。
      Joystick#button/ball/hat/axisの情報はこれで更新される。

==== メソッド

--- SDL::Joystick#index
      ジョイスティックに対応する整数を返す。

--- SDL::Joystick#numAxes
--- SDL::Joystick#num_axes
      いわゆるアナログ入力装置の数を返す。
      ただし、2軸のアナログティックは2個の装置があると数えられる。

--- SDL::Joystick#numBalls
--- SDL::Joystick#num_balls
      トラックボールの数を返す。

--- SDL::Joystick#numButtons
--- SDL::Joystick#num_buttons
      ボタンの数を返す。

--- SDL::Joystick#axis(axis_index)
      アナログ入力装置の入力状態を返す。
      その値は-32768から32768である。
      通常0にはx軸、1にはy軸があてられる。

--- SDL::Joystick#hat(hat_index)
      いわゆる十字キーの入力状態を返す。その内容は以下のとおり。
        SDL::Joystick::HAT_CENTERED
        SDL::Joystick::HAT_UP
        SDL::Joystick::HAT_RIGHT
        SDL::Joystick::HAT_DOWN
        SDL::Joystick::HAT_LEFT
        SDL::Joystick::HAT_RIGHTUP
        SDL::Joystick::HAT_RIGHTDOWN
        SDL::Joystick::HAT_LEFTUP
        SDL::Joystick::HAT_LEFTDOWN

--- SDL::Joystick#button(button_index)
      ボタンの押下情報を返す。
      押していればtrue、いなければfalseを返す。

--- SDL::Joystick#ball(ball_index)
      トラックボールの入力情報を返す。
      その内容は最後にこのメソッドを呼び出してからX軸、Y軸にどれだけ
      動かしたかを配列 [dx,dy] で返す。

== フォント関係

=== SDL::BMFont
ビットマップフォントを表すクラス。利用にはSGEが必要。

==== スーパークラス

Object

==== クラスメソッド

--- SDL::BMFont.open(filename,flags)
      ビットマップフォントをファイルから読み出す。
      flagsは以下のもののORを与える
      * SDL::BMFont::TRANSPARENT
          setColorKeyで透明色を適当に設定する
      * SDL::BMFont::NOCONVERT
      * SDL::BMFont::SFONT
          sfontを使う
      * SDL::BMFont::PALETTE

==== メソッド
--- SDL::BMFont#setColor
--- SDL::BMFont#set_color
      フォントの色を設定する。sfontや色付きフォントには使えない。
      
--- SDL::BMFont#height
      文字の高さを得る
      
--- SDL::BMFont#width
      文字の幅を得る
      
--- SDL::BMFont#textout(surface,string,x,y)
      ((|string|))を((|surface|))に描画する。
      ((|x|)),((|y|))は描画位置の左上となる。

=== SDL::Kanji
bdfフォントを表わすクラス。日本語も利用可能。

==== スーパークラス

Object

==== クラスメソッド
--- SDL::Kanji.open(filename,size)
      bdfフォントファイルを読み、フォントオブジェクトを返す。
      文字の大きさはsizeで指定する。
      
==== メソッド
--- SDL::Kanji#add(filename)
      既に開いているフォントに追加してフォントを開く。
      具体的には以前のフォントに無かった文字が、
      新しいフォントファイルで補完される。
      
--- SDL::Kanji#setCodingSystem(sys)
--- SDL::Kanji#set_coding_system
      文字コードを指定する。
      sysに指定できるのはSDL::Kanji::EUC,SDL::Kanji::SJIS,SDL::Kanji::JIS
      のいずれか。
      
--- SDL::Kanji#textwidth(text)
      指定した文字列の幅を返す。
      
--- SDL::Kanji#width
      ASCII一文字の幅を返す。
      
--- SDL::Kanji#height
      フォントの高さを返す
      
--- SDL::Kanji#put(surface,text,x,y,r,g,b)
      surfaceのx,yに指定した文字列を描画する。
      
--- SDL::Kanji#putTate(surface,text,x,y,r,g,b)
--- SDL::Kanji#put_tate(surface,text,x,y,r,g,b)
      surfaceのx,yに指定した文字列を縦書きで描画する。
      ASCII文字の縦書きはできない。
      
=== SDL::TTF

ＴｒｕｅＴｙｐｅフォントを表すクラス。利用にはSDL_ttfが必要。

==== スーパークラス

Object

==== クラスメソッド

--- SDL::TTF.init
      TrueTypeFontを使うためには最初にこの関数を呼ばなければならない。

--- SDL::TTF.open(filename,size,index=0)
      TrueTypeFontをファイルから読み出し、そのサイズをsizeで指定する。

      indexはそのフォントが複数のfaceを持っている場合にどのfaceを
      使うかを指定するものである。この機能はSDL_ttf 2.0.4以降で
      使用可能である。

==== メソッド

--- SDL::TTF#style
      フォントのスタイルを返す。

--- SDL::TTF#style=(style)
      フォントのスタイルを設定する。指定できるのは以下の定数でORをとったもの。
        SDL::TTF::STYLE_NORMAL
        SDL::TTF::STYLE_BOLD
        SDL::TTF::STYLE_ITALIC
        SDL::TTF::STYLE_UNDERLINE

--- SDL::TTF#textSize(text)
--- SDL::TTF#text_size(text)
      textを描画したときの大きさを[幅,高さ]という配列で返す

--- SDL::TTF#faces
      SDL_ttf 2.0.4 が必要
      faceの数を返す。

--- SDL::TTF#fixedWidth?
--- SDL::TTF#fixed_width?
      SDL_ttf 2.0.4 が必要
      フォントが固定幅であるかどうかを返す。

--- SDL::TTF#familyName
--- SDL::TTF#family_name
      SDL_ttf 2.0.4 が必要
      font family の名前を返す。

--- SDL::TTF#styleName
--- SDL::TTF#style_name
      SDL_ttf 2.0.4 が必要
      フォントのstyleの名前を返す。

--- SDL::TTF#height
      フォントの高さを返す。通常は指定したポイントと同じ。
      
--- SDL::TTF#ascent
      フォントのascent(ベースラインから上端までの相対位置)を返す。
      ベースライン相対の正の値を返す。
      
--- SDL::TTF#descent
      フォントのdescent(ベースラインから下端までの相対位置)を返す。
      ベースライン相対の負の値を返す。
      
--- SDL::TTF#lineSkip
--- SDL::TTF#line_skip
      そのフォントの行間として推奨される値を返す。
      
--- SDL::TTF#drawSolidUTF8(dest,text,x,y,r,g,b)
--- SDL::TTF#draw_solid_utf8(dest,text,x,y,r,g,b)
      selfのフォント設定でdest(Surfaceのインスタンス)にString textを
      destの位置(x,y)の所に書きこむ。色はr,g,bで決められる。
      透明色(ColorKey)は有効である。textはUTF-8を使う。

--- SDL::TTF#drawBlendedUTF8(dest,text,x,y,r,g,b)
--- SDL::TTF#draw_blended_utf8(dest,text,x,y,r,g,b)
      drawSolidUTF8と同様。drawSolidUTF8よりも高品質な描画ができる。

--- SDL::TTF#drawShadedUTF8(dest,text,x,y,fg_r,fg_g,fg_b,bg_r,bg_g,bg_b)
--- SDL::TTF#draw_shaded_utf8(dest,text,x,y,fg_r,fg_g,fg_b,bg_r,bg_g,bg_b)
      drawSolidUTF8と同様。字を書いた部分の後側がbg_r,bg_g,bg_bで指定した
      色で塗り潰されることがdrawSolidUTF8と異なる。

--- SDL::TTF#renderSolidUTF8(text,r,g,b)
--- SDL::TTF#render_solid_utf88(text,r,g,b)
      drawSolidUTF8で描画される文字が描かれたサーフェスを生成する。
      失敗時にはnilを返す。
            
--- SDL::TTF#renderBlendedUTF8(text,r,g,b)
--- SDL::TTF#render_blended_utf8(text,r,g,b)
      ((<SDL::TTF#renderSolidUTF8>))と同様、drawSolidUTF8が
      drawBlendedUTF8になる。
      
--- SDL::TTF#renderShadedUTF8(text,fg_r,fg_g,fg_b,bg_r,bg_g,bg_b)
--- SDL::TTF#render_shaded_utf8(text,fg_r,fg_g,fg_b,bg_r,bg_g,bg_b)
      ((<SDL::TTF#renderSolidUTF8>))と同様、drawSolidUTF8が
      drawShadedUTF8になる。
      
== MPEG再生処理

この機能はsmpegというライブラリによって提供されている。
よってこの機能を使うためにはsmpegが必要である。

音声を再生したい場合は初期化時に((<SDL.init>))の引数としてSDL::INIT_AUDIOを与え、
その後((<SDL::Mixer.open>))を呼ぶ必要がある。

またこの機能は内部で別スレッドを作ってそのスレッド内で再生ルーチンを
呼ぶことによって実現されている。そのため再生中は再生映像が描画されて
いるサーフィスにアクセスしてはいけない。
もう一つ、SDL_Mixerの音声再生機能をフックしているため、音声を伴うmpeg再生、
つまり((<SDL::MPEG#enableAudio>))に真を与えて((<SDL::MPEG#play>))
を呼びだした場合には、((<SDL::Mixer>))の音声再生機能は同時には利用できない。

これらの制限に対しては、一切のチェックをRuby/SDLでは行っていません。よって
MPEG再生機能を使う場合には注意してください。

=== SDL::MPEG

MPEGのデータを表す。

==== スーパークラス

Object

==== クラスメソッド

--- SDL::MPEG.load(filename)
--- SDL::MPEG.new(filename)
      MPEGファイルを読み込み、SDL::MPEGのインスタンスを返す。

==== メソッド

--- SDL::MPEG#info
      MPEGの現在の情報を返す。返り値はSDL::MPEG::Infoのインスタンス

--- SDL::MPEG#enableAudio(enable)
--- SDL::MPEG#enable_audio(enable)
      音声の再生をするかどうか指定する。trueで再生、falseで再生しないを
      指定できる。

--- SDL::MPEG#enableVideo(enable)
--- SDL::MPEG#enable_video(enable)
      映像の再生をするかどうか指定する。trueで再生、falseで再生しないを
      指定できる。

--- SDL::MPEG#status
      MPEGストリームの現在の状態を返す。返り値は以下の通り。
        SDL::MPEG::ERROR
        SDL::MPEG::STOPPED
        SDL::MPEG::PLAYING

--- SDL::MPEG#setVolume(volume)
--- SDL::MPEG#set_volume(volume)
      ボリュームを指定する。0から100までが有効。

--- SDL::MPEG#setDisplay(surface)
--- SDL::MPEG#set_display(surface)
      再生した映像を実際に描画するサーフィスを指定する。

--- SDL::MPEG#setLoop(repeat)
--- SDL::MPEG#set_loop(repeat)
      再生がループするかどうか設定する。trueでループする、falseでループしな
      いとなる。

--- SDL::MPEG#scaleXY(w,h)
--- SDL::MPEG#scale_xy(w,h)
      再生映像の大きさを幅 w 、高さ h に指定する。

--- SDL::MPEG#scale(scale)
      再生画像の大きさをscale倍に指定する。

--- SDL::MPEG#move(x,y)
      再生画像の左上の位置を(x,y)に指定する。

--- SDL::MPEG#setDisplayRegion(x,y,w,h)
--- SDL::MPEG#set_display_region(x,y,w,h)
      再生画像のsetDisplayで指定したサーフィス内での描画範囲を指定する。

--- SDL::MPEG#play
      MPEGを再生する。

      注意: 再生中にはsetDisplayで指定したサーフィスにアクセスしては
      いけない。

--- SDL::MPEG#pause
      再生を一時中断する。

--- SDL::MPEG#stop
      再生を停止する。

--- SDL::MPEG#rewind
      再生位置を一番最初にする。

--- SDL::MPEG#seek(bytes)
      bytesバイトの位置に再生位置を移動する。

--- SDL::MPEG#skip(seconds)
      seconds秒再生位置を前方に移動させる。

--- SDL::MPEG#renderFrame(framenum)
--- SDL::MPEG#render_frame(framenum)
      framenum目のフレームを描画する。

--- SDL::MPEG#setFilter(filter)
--- SDL::MPEG#set_filter(filter)
      再生映像にかけるフィルタを指定する。以下のフィルタを指定可能。
        SDL::MPEG::NULL_FILTER  フィルタなし
        SDL::MPEG::BILINEAR_FILTER  バイリニアフィルタ 
        SDL::MPEG::DEBLOCKING_FILTER   

=== SDL::MPEG::Info

((<SDL::MPEG>))の情報を持つ。
((<SDL::MPEG#info>))などでこのクラスのインスタンスを得る。

==== スーパークラス

Object

==== メソッド

--- SDL::MPEG::Info#has_audio
--- SDL::MPEG::Info#has_video
--- SDL::MPEG::Info#width
--- SDL::MPEG::Info#height
--- SDL::MPEG::Info#current_frame
--- SDL::MPEG::Info#current_fps
--- SDL::MPEG::Info#audio_string
--- SDL::MPEG::Info#audio_current_frame
--- SDL::MPEG::Info#current_offset
--- SDL::MPEG::Info#total_size
--- SDL::MPEG::Info#current_time
--- SDL::MPEG::Info#total_time

== 時刻処理

=== モジュール関数

--- SDL.getTicks
--- SDL.get_ticks
      ((<SDL.init>))が呼ばれてからの時間をミリ秒で返す。
      49日ほどスクリプトを走らせつづけると0にもどるのに注意。

--- SDL.delay(ms)
      ミリ秒で指定された時間だけ待つ。
      OSのスケジューリングのため指定した時間よりも長く待つ可能性がある。

== SDLSKKによる日本語入力機能

SDLSKKによる日本語入力機能を実現するための機能。
SDLSKKライブラリが必要である。

これに関するすべてのクラスはSDL::SKKの下にある。

これを使うためには((<SDL.init>))を呼んだ後に((<SDL::Event2.enableUNICODE>))を
呼ぶ必要がある。

=== モジュール関数

--- SDL::SKK.encoding=(encoding)
      利用するエンコーディングを指定します。以下の3つが指定できます。
      * SDL::SKK::EUCJP
      * SDL::SKK::UTF8
      * SDL::SKK::SJIS

--- SDL::SKK.encoding
      現在設定しているエンコーディングを返します。
      
=== SDL::SKK::Context

入力の状態を保持するクラス。

==== スーパークラス

Object

==== クラスメソッド

--- SDL::SKK::Context.new(dict,romkana_table,bind,use_minibuffer)
      ((<SDL::SKK::Context>))のインスタンスを生成し、それを返す。
      dict、romkana_tableとして利用する辞書とローマ仮名変換の規則の情報
      を与える。bindとしてキーバインドを与える。use_minibufferを真にすると
      ミニバッファが利用できる。
      
==== メソッド

--- SDL::SKK::Context#input(event)
      キーボードからの入力をするメソッド。
      
--- SDL::SKK::Context#str
      入力された文字列を返すメソッド。
      
--- SDL::SKK::Context#render_str(font,r,g,b)
      入力文字列が描かれた((<SDL::Surface>))のインスタンスを返すメソッド。

--- SDL::SKK::Context#render_minibuffer_str(font,r,g,b)
      ミニバッファの文字列が描かれた((<SDL::Surface>))のインスタンスを
      返すメソッド。

--- SDL::SKK::Context#clear
      入力文字列と入力状態をクリアして初期状態にもどす。

--- SDL::SKK::Context#clear_text
      contextのcontextのモードが、確定入力モード、アルファベット入力モード、
      JISX0208アルファベット入力モードのいずれかであればそのモードを
      維持したまま入力テキストを空にする。
      
      複数行の入力を実現したい場合、SDLSKK_Context_clearを呼ぶと
      モードが確定入力モードに戻ってしまうのが不自然である場合、この関数を
      呼ぶとよい。
      
      また、カットバッファの内容も保存される。
      
--- SDL::SKK::Context#get_basic_mode
      contextのモードが、確定入力モード、アルファベット入力モード、
      JISX0208アルファベット入力モードのいずれかであれば真を、それ
      以外では偽を返す。辞書登録モードのときなども偽を返す。

      これが真のときにリターンキーを押したら入力終了とみなす、
      などといった処理に利用する。

=== SDL::SKK::Dictionary

辞書を示すクラス。

==== スーパークラス

Object

==== クラスメソッド

--- SDL::SKK::Dictionary.new
      辞書オブジェクトを返す。
      最初の状態では辞書の内容は空である。
      
==== メソッド

--- SDL::SKK::Dictionary#load(dictfile,users)
      ファイルから辞書にデータを読みこむ。
      usersを真にすると読みこむ辞書はユーザ辞書として扱われる。

--- SDL::SKK::Dictionary#save(filename)
      ユーザ辞書をファイルに書きだす。
      
=== SDL::SKK::RomKanaRuleTable

ローマ字からかなへの変換の規則をあらわしたクラス。

==== スーパークラス

Object

==== クラスメソッド

--- SDL::SKK::RomKanaRuleTable.new(table_file)
      ファイルからデータを読みこみ((<SDL::SKK::RomKanaRuleTable>))の
      インスタンスを生成する。
      
==== メソッド

=== SDL::SKK::Keybind

SDLSKKでのキーバインドを表わすクラス。

==== スーパークラス

Object

==== クラスメソッド

--- SDL::SKK::Keybind.new
      キーバインドオブジェクトを確保する。
      最初はキーバインドは空である。

==== メソッド

--- SDL::SKK::Keybind#set_key(key_str,cmd_str)
    
      キーバインドを設定する。
      key_strとして与えられる文字列は以下の通り
      * アルファベット、% などのasciiの記号
        * "SPC" "TAB" "DEL" "RET" "UP" "DOWN" "RIGHT" "LEFT" "INSERT" "HOME" "END"
          "PAGEUP" "PAGEDOWN" "F1" "F2" "F3" "F4" "F5" "F6" "F7" "F8" "F9" "F10"
          "F11" "F12" "F13" "F14" "F15" "HELP"
        * "C-a" "M-C-a" などといった修飾キー
  
      cmd_strとして与えられる文字列は以下の通り
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
      ただし、"a" "/" などのascii character 一文字のキーにはデフォルト以外の
      キーバインドはしないようにしてください
      
      標準のキーバインドを少し変更したいという場合は、まず
      ((<SDL::SKK::Keybind#set_default_key>))を呼んで、デフォルトのキーバインドを
      設定してから((<SDL::SKK::Keybind#set_key>))を呼んでください

--- SDL::SKK::Keybind#set_default_key

      標準的なキーバインドを設定する

--- SDL::SKK::Keybind#unset_key(key_str)

      指定したキーのキーバインドを消す

== OpenGLによる3D描画
Ruby/SDLでは、Ruby用のOpenGL Interfaceを併用することで3D描画が実現可能である。
OpenGL Interfaceのインストールのしかたなどについては、README.jaを
参照せよ。Windows用のバイナリには必要なものがすべて含まれている。

基本的には、以下のことをすれば使える。
(1) sdlとopenglをrequireでロードする
(2) ((<SDL.init>))をSDL::INIT_VIDEO付きで呼ぶ
(3) ((<SDL.setGLAttr>))で必要な設定をする
(4) ((<SDL.setVideoMode>))のflagにSDL::OPENGLを加えて呼ぶ
(5) GLモジュールの描画関数を呼び、描画する(詳しくはOpenGL Interfaceのドキュメントなどを参照するとよいだろう)
(6) 描画内容の画面への反映は、((<SDL.flip>))などではなく、((<SDL.GLSwapBuffersn>))を呼ぶ。

また、OpenGLを使っているときは、((<SDL.blitSurface>))などのSDLの2D描画機能は
使うべきではない。そのような利用は想定されていないからである。
sample/testgl.rbなどが参考になるであろう。

=== モジュール関数
--- SDL.setGLAttr(attr,val)
--- SDL.set_GL_attr(attr,val)
      OpenGL属性((|attr|))の値を((|val|))にする。
      
      使える属性は以下の通り
      * SDL::GL_RED_SIZE
      * SDL::GL_GREEN_SIZE
      * SDL::GL_BLUE_SIZE
      * SDL::GL_ALPHA_SIZE
      * SDL::GL_BUFFER_SIZE
      * SDL::GL_DOUBLEBUFFER
      * SDL::GL_DEPTH_SIZE
      * SDL::GL_STENCIL_SIZE
      * SDL::GL_ACCUM_RED_SIZE
      * SDL::GL_ACCUM_GREEN_SIZE
      * SDL::GL_ACCUM_BLUE_SIZE
      * SDL::GL_ACCUM_ALPHA_SIZE

--- SDL.getGLAttr(attr)
--- SDL.get_GL_attr(attr)
      OpenGL属性((|attr|))の値を得る。
      ((<SDL.setVideoMode>))を呼んだ後に指定した属性が期待通りであるかを
      チェックするのに有用である。
      
--- SDL.GLSwapBuffers
--- SDL.GL_swap_buffers
      ダブルバッファがサポートされている場合、OpenGLのバッファを入れ替える。
      
== その他
=== Linuxで'--disable-pthread'を使わない場合の問題を避ける方法
以下の内容をスクリプトの最初に置いておけばこの問題を回避できる可能性がある。
  require 'rbconfig'
  
  if RUBY_PLATFORM =~ /linux/
    trap('INT','EXIT')
    trap('EXIT','EXIT')
  end
  
=end
