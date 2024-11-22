declare type BookInfo = {
  author: string;
  title: string;
  content: {
    chapters: {
      [chapterLink: string]: string; // Keys are chapter links, values are contents
    };
    images: {
      [imageLink: string]: string;
    };
  };
};
