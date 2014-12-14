---
page:
  variables:
    title: Linux on a Macbook
    date: 2012-07-26
    time: 1:31AM
---
I got home the two nights ago to discover the screen of my Thinkpad cracked. A shame, but atleast I have a new server. In anycase, my only other spare computer currently happens to be my old 13" Duo Core White Macbook.

Onto Linux on a Mac, once again. Some advice to anyone trying to get a Non-Mac OS onto a Mac, use MBR and save yourself the EFI / GPT headaches. I had installed Linux on this Macbook before, and again this past time I felt I had to put myself through the pain of attempting GPT on the Macbook. The Arch Wiki page on Macbooks advises strongly against MBR, possibly beacuse its just the older schema. However, I think the pragmatic approach applies here. Simply, MBR just works, GPT I havn't been able to get to work. It seems other have succeeded with GPT, however for some reason my Macbook continually fails to cooperate.

So after a few failed GPT installs, and finally getting a booting install with MBR/Grub2, I was onward. I still need to bless my boot partion (thanks Apple), but for now I can wait 30 seconds for Grub to kick in. Other than that it works fine!
