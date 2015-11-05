; Nibbles by Altair/ODDS entertainment (48 bytes version)

; Credits to my friend Warp about shrinking this entry from 50 to 48 bytes and

; about all the emitted enthusiasm (:



; Compile as follows:

;   tasm /m2 nibbles

;   tlink /x /t nibbles



; Change the heading direction of the worm with keypad arrow-keys. Because the

; game can't handle any other keys but keypad arrow keys, you need to start it

; by typing pause|nibbles in DOS prompt and then hitting an arrow key. Because

; top memory segment in PSP is environment dependant you need version suitable

; for your environment. Uncomment the version suitable for your environment in

; "Draw borders"-section and recompile the game with commands shown above.





.286

code                         segment   para public use16

                             assume    cs:code

                             org       0100h

  start:



; es=0x9fc0/0x9fff/0xa000

                             les       si,[bx]         ;2 bytes

; Set video mode 13h at first loop. At following loops palette setting function

; provided by this interrupt is used for vertical retrace wait.

    main_loop:

                             mov       al,13h

                             int       10h             ;4 bytes

; Draw borders

                             ;mov       di,320*199+1024 ;Raw DOS

                             ;mov       di,320*199+16   ;DOS+Himem/WinNT

                             mov       di,320*199      ;Win95 DOS

                             mov       cx,2176

                             rep

    draw_loop:               stosb

                             stosb

                             add       di,318

                             jnc       draw_loop       ;15 bytes



; Keyboard handling routine. At the end AX contains offset displacement based

; on pressed/released keypad key.

                             in        al,60h

                             aaa

                             cbw

                             dec       ax

                             dec       ax

                             jc        kb_handle_end

                             sub       al,2

                             imul      ax,-80

    kb_handle_end:           add       si,ax           ;15 bytes

; Set palette command (10h/0bh). This command also waits for vertical retrace.

                             mov       ax,0b03h        ;3 bytes

; Draw worm and check for collision with parity (even parity=collision).

                             xor       es:[si],ah

                             jpo       main_loop       ;5 bytes

; Set video mode 03h and exit.

                             cbw

                             int       10h

                             ret                       ;4 bytes

code                         ends

                             end       start