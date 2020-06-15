#!/bin/bash
count=1

while [ $count -le $1 ] 

do
    fsutil file createnew "$count.js" 1024
    count=$(($count+1))
done