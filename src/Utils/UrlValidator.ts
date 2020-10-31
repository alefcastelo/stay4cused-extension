class URLValidator {
    url: string
    constructor (url: string) {
      this.url = url
    }

    isValid () {
      const pattern = new RegExp(
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
      )

      return pattern.test(this.url)
    }
}

export default URLValidator