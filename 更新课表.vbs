Dim WinScriptHost
Set WinScriptHost = CreateObject("WScript.Shell")
WinScriptHost.Run Chr(34) & "G:\WORK\学习\法国\1. INSA\8. IF3\0. Divers\课程表\servif.insa-lyon.fr\更新课表.bat" & Chr(34), 0
Set WinScriptHost = Nothing