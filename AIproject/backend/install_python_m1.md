<!-- create the virtual environment -->
python3 -m venv tf_python

<!-- running command for python on the terminal -->
source tf_python/bin/activate

<!-- keeping the python up-to-date -->
pip install --upgrade pip

<!-- show packages installed within the virtual environment -->
pip list

<!-- Save the installed version -->
pip list
pip list | grep tensorflow

<!-- python installation-->
<<<<<<< HEAD
python -m pip install tensorflow-macos tensorflow-metal protobuf==3.9.2 sanic numpy ipykernel pillow matplotlib fastapi conda python-multipart opencv

pip install uvicorn[standard]

<!-- python execution-->
=======
python -m pip install tensorflow-macos tensorflow-metal protobuf==3.9.2 sanic numpy ipykernel pillow matplotlib


pip install unicorn
>>>>>>> aef248e10aa7d213560d01af334b04c95d26bd7c
uvicorn main:app --reload --host=0.0.0.0