from captcha.image import ImageCaptcha
from random import randint, randbytes
from hashlib import sha1, sha256
from os.path import isfile


def create_captcha_salt():
    print("Creating captcha salt...")
    f = open("./data/captcha-salt.txt", "x")
    f.write(sha256(randbytes(1024)).hexdigest())
    f.close()


def read_captcha_salt():
    if not isfile("./data/captcha-salt.txt"):
        create_captcha_salt()

    f = open("./data/captcha-salt.txt", "r")
    s = f.read()
    f.close()
    return s


capctha_salt = read_captcha_salt()

img_captcha = ImageCaptcha(
    width=160,
    height=80,
    fonts=["./captchas/fonts/Caveat.ttf", "./captchas/fonts/IndieFlower.ttf"]
)


def generate_captcha_pair():
    numbers = "".join([str(randint(0, 9)) for _ in range(4)])
    hash = sha1()
    hash.update(numbers.encode("ascii"))
    hash.update(capctha_salt.encode("ascii"))

    return (numbers, hash.hexdigest())


def generate_captcha():
    (num, hash) = generate_captcha_pair()
    img_captcha.write(num, f"./data/captchas/{hash}.png", "png")
    return hash


def validate_captcha_pair(numbers: str, hash: str):
    h = sha1()
    h.update(numbers.encode("ascii"))
    h.update(capctha_salt.encode("ascii"))
    valid = hash == h.hexdigest()

    return valid
