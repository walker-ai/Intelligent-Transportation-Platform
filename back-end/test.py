import cv2
import dlib
from PIL import Image,ImageTk
from flask import Flask,render_template,Response
app=Flask(__name__)

detect=dlib.get_frontal_face_detector()
font=cv2.FONT_HERSHEY_SIMPLEX
margin=0.2
img_w,img_h=128,128

@app.route('/',methods=['POST','GET'])
def index():
    return render_template('video.html')

def Video():
    cap = cv2.VideoCapture(0)
    while cap.isOpened():
        OK,frame=cap.read()
        if not OK:
            break
        detects=detect(frame)
        if len(detects)>0:
            for i,locate in enumerate(detects):
                x1,y1,x2,y2,w,h=locate.left(),locate.right()+1,locate.bottom()+1,locate.width(),locate.width(),locate.height()

                xw1=max(int(x1-margin*w),0)
                yw1=max(int(y1-margin*h),0)
                xw2=min(int(x2+margin*w),img_w-1)
                yw2=min(int(y2+margin*h),img_h-1)

                cv2.rectangle(frame,(x1,y1),(x2,y2),(0,255,0),2)
                cv2.putText(frame,'person',(locate.left(),locate.top()-10),font,1.2,(255,0,0),3)
        # print(type(frame))
        image=cv2.imencode('.jpg',frame)[1].tobytes()
        ## 使用generator函数输出视频流， 每次请求输出的content类型是image/jpeg
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n'+image+b'\r\n')

    cap.release()
    cv2.destroyAllWindows()

@app.route('/video_indexs',methods=['POST','GET'])
def video_index():
    ## 这个地址返回视频流响应
    return Response(Video(),mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__=='__main__':
    print('Pycharm')
    app.run(debug=True)
