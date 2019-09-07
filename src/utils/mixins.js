import moment from "moment"

const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      if (!datetime) {
        return "-";
      }
      return moment(datetime).fromNow();
    }
  }
}

const placeholderImageCreator = {
  filters: {
    placeholderImage(link) {
      return link ? link : 'http://via.placeholder.com/300x300?text=No+Image'
    }
  }
}

export { fromNowFilter, placeholderImageCreator }