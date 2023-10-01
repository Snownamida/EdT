G:
cd "G:\WORK\学习\法国\1. INSA\8. IF3\0. Divers\课程表\servif.insa-lyon.fr"
node fetchEdT.js >> 更新课表.log && git add "json/fetchtime.json" "EdT/3IF.html" >> 更新课表.log&& git commit -m "自动更新课表" >> 更新课表.log && git push >> 更新课表.log