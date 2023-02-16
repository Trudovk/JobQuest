from os import mkdir
from shutil import rmtree


def rm(path: str):
    try:
        rmtree(path)
    except FileNotFoundError:
        pass


def mkdir_if_doesnt_exist(path: str):
    try:
        mkdir(path)
    except FileExistsError:
        pass


rm("./data")

mkdir_if_doesnt_exist("./data")
mkdir_if_doesnt_exist("./data/captchas")
