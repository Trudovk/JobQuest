from os import rmdir, mkdir


def rm(path: str):
    try:
        rmdir(path)
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
