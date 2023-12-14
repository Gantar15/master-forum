export class UriUtil {
  public static encodeText(text: string) {
    return encodeURIComponent(text);
  }
  public static decodeURI(text: string) {
    return decodeURIComponent(text);
  }
}
