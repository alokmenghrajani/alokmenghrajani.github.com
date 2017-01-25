
RSD = ruby rsd.rb
RDFILES = general.rd init.rd video.rd wm.rd event.rd joystick.rd cdrom.rd mixer.rd time.rd font.rd collision.rd sdlskk.rd mpeg.rd
RD2 = rd2
RD2OPT = -r rd/rd2html-lib.rb --html-lang=ja --html-charset=EUC-JP


rubysdl_ref.html: rubysdl_ref.rd
	$(RD2) $(RD2OPT) --html-title="Ruby/SDL Reference Manual" $< > $@ || rm -f $@

rubysdl_ref.rd: $(RDFILES)
	cat $(RDFILES) > rubysdl_ref.rd

%.rd: %.rsd
	$(RSD) < $< > $@

install: rubysdl_ref.html
	cp rubysdl_ref.html rubysdl_ref.rd ..
