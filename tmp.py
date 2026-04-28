# Source - https://stackoverflow.com/a/58943018
# Posted by Barmar
# Retrieved 2026-04-28, License - CC BY-SA 4.0


def unicode_escape(s):
    return "".join(map(lambda c: rf"\u{ord(c):04x}", s))


print(unicode_escape("Welcome to my developer blog!\n"))
# prints \u0048\u0065\u006c\u006c\u006f\u002c\u0020\u0057\u006f\u0072\u006c\u0064\u0021\u000a
