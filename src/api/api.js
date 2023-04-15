export async function getPhotos(){
    try {
        const response = await fetch(
          `https://api.unsplash.com/users/janisringli/photos/?per_page=30`,
          {
            method: "GET",
            headers: new Headers({
                Authorization: 'Client-ID 8AaOzWIzBjToHkNNYtgTYyBlnDcNr4-A_uBGakwF5BI',
            }),
          }
        );
        const payload = await response.json();
        return payload;

      } catch (error) {
        console.log(error);
      }
  return await response.json
};

export async function getSinglePhotos(photoId){
  try {
    console.log(photoId)
      const response = await fetch(
        `https://api.unsplash.com/photos/${photoId}`,
        {
          method: "GET",
          headers: new Headers({
              Authorization: 'Client-ID 8AaOzWIzBjToHkNNYtgTYyBlnDcNr4-A_uBGakwF5BI',
          }),
        }
      );
      const payload = await response.json();
      // console.log(payload)
      return payload;

    } catch (error) {
      console.log(error);
    }
return await response.json
};

export async function getStats(){
  try {
      const response = await fetch(
        `https://api.unsplash.com/users/janisringli/`,
        {
          method: "GET",
          headers: new Headers({
              Authorization: 'Client-ID 8AaOzWIzBjToHkNNYtgTYyBlnDcNr4-A_uBGakwF5BI',
          }),
        }
      );
      const payload = await response.json();
      console.log(payload)
      return payload;

    } catch (error) {
      console.log(error);
    }
return await response.json
};