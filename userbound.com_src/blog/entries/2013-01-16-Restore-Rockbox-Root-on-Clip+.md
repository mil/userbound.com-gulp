---
title: Restoring Rockbox Root on Clip+
categories: blog
time: 4:54PM
---
Recently my Sansa Clip+ died on me randomly. I had Rockbox installed for about two years and then one day when I booted it up it just said "File not found". Makes sense, flash can be temperamental.  In anycase, for any of yall in the same position, here's the quick restore procedure to get your Rockbox root fs back and booting:

Plug in your Clip+ and wipe the partition table, make a new partition, format it vfat, and mount it:

<pre class="sh_c">
fdisk /dev/sdb (your device)
  --> proceed to delete (d) any existing partitions, 
    (in my case there were none)
  --> make a new partition (n), set filesystem type(t) to b
  --> write (w) out
mkfs.vfat /dev/sdb1 (your device partition)
mkdir /mnt/clip
mount /dev/sdb1 /mnt/clip
</pre>

Now you've got a partition to work with, so proceed with normal Rockbox setup procedure. Download the Rockbox firmware and copy it over to your clip:

<pre class="sh_c">
wget http://build.rockbox.org/data/rockbox-sansaclipplus.zip
unzip rockbox-sansaclipplus.zip
mv .rockbox /mnt/clip
</pre>

Then, patch and copy over the bootloader the manual way (GUI didn't work for me):

<pre class="sh_c">
wget http://mp3support.sandisk.com/firmware/clipplus/clipplus01.02.16.zip
wget http://download.rockbox.org/bootloader/sandisk-sansa/clipplus/bootloader-clipplus.sansa
wget http://download.rockbox.org/bootloader/sandisk-sansa/mkamsboot/linux-x86-32/mkamsboot
unzip clipplus01.02.16.zip
./mkamsboot clppa.boot bootloader-clipplus.sansa patched.bin
cp patched.bin /mnt/clip/clppa.bin
umount /mnt/clip
</pre>

Unplug the Clip+ and Rockbox should be working again.
