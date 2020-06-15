#!/bin/bash
url="https://api.github.com/users/$1"
res=$(curl $url)
echo $res | fx 'x=>x.name'
echo $res | fx 'x=>x.bio'
echo $res | fx 'x=>x.location'
echo $res | fx 'x=>x.blog'