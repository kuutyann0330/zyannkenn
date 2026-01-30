import cv2
from flask import Blueprint, render_template, request, redirect
from tkinter import messagebox
index_bp = Blueprint('index', __name__, url_prefix='/')


@index_bp.route("/")
def index():
    # your code
    # cap = cv2.VideoCapture(0)
    # messagebox.askyesno('確認')
    # if not cap.isOpened():
    #     return
    return render_template("index.html")