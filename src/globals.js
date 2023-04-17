import { getPhotos, getStats } from "./api/api";

const globals = {
    username: 'janisringli',
    setUsername(newUsername) {
      this.username = newUsername;
      getStats(this.username);

    },
  };
  
  export default globals;