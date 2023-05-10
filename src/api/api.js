export async function getPhotos(username) {
  try {
    const userProfileResponse = await fetch(
      `https://api.unsplash.com/users/${username}`,
      {
        method: "GET",
        headers: new Headers({
          Authorization:
            `Client-ID ${import.meta.env.VITE_REACT_APP_API_TOKEN}`,
        }),
      }
    );
    const userProfile = await userProfileResponse.json();
    const totalPhotos = userProfile.total_photos;
    const perPage = 30;
    const totalPages = Math.ceil(totalPhotos / perPage);

    let photos = [];

    for (let page = 1; page <= totalPages; page++) {
      const statsResponse = await fetch(
        `https://api.unsplash.com/users/${username}/photos/?per_page=${perPage}&page=${page}&stats=true`,
        {
          method: "GET",
          headers: new Headers({
            Authorization:
              `Client-ID ${import.meta.env.VITE_REACT_APP_API_TOKEN}`
          }),
        }
      );
      const payload = await statsResponse.json();
      photos = photos.concat(payload);
    }

    const formattedPhotos = photos.map((photo) => {
      const dateObj = new Date(photo.created_at);
      const formattedDate = dateObj.toLocaleDateString("de-CH", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });
            const formattedViews = new Intl.NumberFormat('en-GB').format(photo.statistics?.views.total);
 const formattedDownloads = new Intl.NumberFormat('en-GB').format(photo.statistics?.downloads.total);
      let downloadRate = (photo.statistics.downloads.total / photo.statistics.views.total) * 100;
      if (photo.statistics.downloads.total === 0) {
        downloadRate = 0;
      }

      return {
        ...photo,
        created_at: formattedDate,
        download_rate: Math.round(downloadRate * 100) / 100,
        downloads: formattedDownloads,
        views: formattedViews
      };
    });

    return formattedPhotos;
  } catch (error) {
    console.log(error);
  }
}


       




export async function getSinglePhotos(photoId) {
  try {
    console.log(photoId);
    const response = await fetch(`https://api.unsplash.com/photos/${photoId}`, {
      method: "GET",
      headers: new Headers({
        Authorization:
        `Client-ID ${import.meta.env.VITE_REACT_APP_API_TOKEN}`

      }),
    });
    const payload = await response.json();
    return payload;
  } catch (error) {
    console.log(error);
  }
  return await response.json;
}

export async function getStats(username) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/users/${username}/`,
      {
        method: "GET",
        headers: new Headers({
          Authorization:
            `Client-ID ${import.meta.env.VITE_REACT_APP_API_TOKEN}`

        }),
      }
    );
    const payload = await response.json();
    return payload;
  } catch (error) {
    console.log(error);
  }

  return await response.json;
}

export async function getSinglePhotoStats(photoId) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/${photoId}/statistics`,
      {
        method: "GET",
        headers: new Headers({
          Authorization:
            `Client-ID ${import.meta.env.VITE_REACT_APP_API_TOKEN}`
        }),
      }
    );
    const payload = await response.json();

    // Format date strings in historical downloads
    const formattedDownloads = payload.downloads.historical.values.map((value) => {
      const date = new Date(value.date);
      const formattedDate = date.toLocaleDateString("de-CH", {
        month: "short",
        day: "numeric",
        hour12: false,
      });
      return { ...value, date: formattedDate };
    });
    payload.downloads.historical.values = formattedDownloads;

    // Format date strings in historical views
    const formattedViews = payload.views.historical.values.map((value) => {
      const date = new Date(value.date);
      const formattedDate = date.toLocaleDateString("de-CH", {
        month: "short",
        day: "numeric",
        hour12: false,
      });
      return { ...value, date: formattedDate };
    });
    payload.views.historical.values = formattedViews;

    return payload;
  } catch (error) {
    console.log(error);
  }
}




export async function getMonthlyStats() {
  try {
    const response = await fetch(`https://api.unsplash.com/stats/monthly`, {
      method: "GET",
      headers: new Headers({
        Authorization: 
        `Client-ID ${import.meta.env.VITE_REACT_APP_API_TOKEN}`

      }),
    });
    const payload = await response.json();
    return payload;
  } catch (error) {
    console.log(error);
  }
  return await respons.json;
}
export async function getTotalStats() {
  try {
    const response = await fetch(`https://api.unsplash.com/stats/total`, {
      method: "GET",
      headers: new Headers({
        Authorization:
        `Client-ID ${import.meta.env.VITE_REACT_APP_API_TOKEN}`

      }),
    });
    const payload = await response.json();
    return payload;
  } catch (error) {
    console.log(error);
  }
  return await respons.json;
}
