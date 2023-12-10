

export function takePhoto() {
  fetch('http://192.168.1.11:8080/takephoto')
    .then(res => {
      console.log({res});
    });
};

export function deletePhoto(fileName: string) {
  fetch(`http://192.168.1.11:8080/deletephoto/${fileName}`)
  .then(res => {
    console.log({res});
  });
}


// 型をつけるためのwrapper
const fetchWrpper = <T>(task: Promise<Response>): Promise<T> => {
  return new Promise((resolve, reject) => {
    task.then(response => {
      if (response.ok) {
        response.json().then(json => {
          resolve(json);
        })
      }
    })
  })
}

// wrapperを呼び出す
const fetcher = <T = any> (
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => {
  return fetchWrpper<T>(fetch(input, init))
}

export type PhotoNames = Array<string>

// 画像名を取得するapiの結果を返す
export async function updatePhoto() {
  return fetcher<PhotoNames>(
    'http://192.168.1.11:8080/updatephoto/'
  );
}