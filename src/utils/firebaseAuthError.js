function getFirebaseErrorMessage(error) {
  switch (error) {
    case "auth/claims-too-large":
      return "Hesap bilgilerinizde yaptığınız değişiklikler çok büyük. Lütfen daha az bilgi girerek tekrar deneyin.";
    case "auth/email-already-exists":
      return "Bu e-posta adresi zaten kullanımda. Farklı bir e-posta adresi deneyin veya hesabınıza giriş yapın.";
    case "auth/id-token-expired":
      return "Oturum süreniz doldu. Lütfen tekrar giriş yapın.";
    case "auth/id-token-revoked":
      return "Güvenlik nedeniyle oturumunuz kapatıldı. Lütfen yeniden giriş yapın.";
    case "auth/insufficient-permission":
      return "Bu işlem için gerekli yetkilere sahip değilsiniz. Lütfen yöneticinizle iletişime geçin.";
    case "auth/internal-error":
      return "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin veya daha sonra geri dönün.";
    case "auth/invalid-argument":
      return "Geçersiz bir bilgi girdiniz. Lütfen tekrar kontrol edin.";
    case "auth/invalid-claims":
      return "Hesap bilgileri doğru şekilde güncellenemedi. Lütfen tekrar deneyin.";
    case "auth/invalid-continue-uri":
      return "Devam edilecek bağlantı geçersiz. Lütfen destek ekibine başvurun.";
    case "auth/invalid-creation-time":
      return "Hesap oluşturulma tarihi geçersiz görünüyor. Lütfen tekrar deneyin.";
    case "auth/invalid-credential":
      return "Kimlik bilgileri doğrulanamadı. Lütfen tekrar deneyin.";
    case "auth/invalid-disabled-field":
      return "Geçersiz bir bilgi girdiniz. Lütfen alanları kontrol edip tekrar deneyin.";
    case "auth/invalid-display-name":
      return "Girdiğiniz kullanıcı adı geçersiz. Boş olmayan bir ad kullanmayı deneyin.";
    case "auth/invalid-dynamic-link-domain":
      return "Geçersiz bir bağlantı kullandınız. Lütfen doğru bağlantıyı kontrol edin.";
    case "auth/invalid-email":
      return "Geçersiz bir e-posta adresi girdiniz. Lütfen e-posta adresinizi kontrol edin.";
    case "auth/invalid-email-verified":
      return "E-posta doğrulama durumu geçersiz. Lütfen tekrar deneyin.";
    case "auth/invalid-hash-algorithm":
      return "Sistemsel bir hata oluştu. Lütfen destek ekibi ile iletişime geçin.";
    case "auth/invalid-id-token":
      return "Geçersiz kimlik doğrulama bilgileri. Lütfen tekrar giriş yapın.";
    case "auth/invalid-password":
      return "Şifreniz geçersiz. Şifreniz en az 6 karakter olmalıdır.";
    case "auth/invalid-phone-number":
      return "Geçersiz bir telefon numarası girdiniz. Lütfen numaranızı kontrol edin ve tekrar deneyin.";
    case "auth/invalid-photo-url":
      return "Fotoğraf URL'si geçersiz. Lütfen geçerli bir URL girin.";
    case "auth/invalid-provider-data":
      return "Sağlayıcı bilgileri geçersiz. Lütfen tekrar deneyin.";
    case "auth/maximum-user-count-exceeded":
      return "Maksimum kullanıcı limitine ulaşıldı. Lütfen daha sonra tekrar deneyin.";
    case "auth/missing-android-pkg-name":
      return "Eksik Android paket adı. Lütfen destek ekibi ile iletişime geçin.";
    case "auth/missing-continue-uri":
      return "Devam etmek için gereken bağlantı eksik. Lütfen doğru bağlantıyı kullandığınızdan emin olun.";
    case "auth/missing-uid":
      return "Kullanıcı kimliği eksik. Lütfen tekrar deneyin.";
    case "auth/operation-not-allowed":
      return "Bu oturum açma yöntemi şu anda devre dışı. Lütfen farklı bir yöntem deneyin.";
    case "auth/phone-number-already-exists":
      return "Bu telefon numarası zaten başka bir hesapla ilişkili. Lütfen farklı bir numara deneyin.";
    case "auth/project-not-found":
      return "Proje bulunamadı. Lütfen destek ekibiyle iletişime geçin.";
    case "auth/session-cookie-expired":
      return "Oturumunuzun süresi doldu. Lütfen tekrar giriş yapın.";
    case "auth/too-many-requests":
      return "Çok fazla istek gönderdiniz. Lütfen bir süre sonra tekrar deneyin.";
    case "auth/uid-already-exists":
      return "Bu kullanıcı kimliği zaten kullanımda. Farklı bir kullanıcı kimliği deneyin.";
    case "auth/user-not-found":
      return "Bu bilgilere sahip bir kullanıcı bulunamadı. Lütfen kayıt olduğunuzdan emin olun.";
    case "auth/email-already-in-use":
      return "Bu e-posta adresi zaten kullanımda. Farklı bir e-posta adresi deneyin.";
    default:
      return "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
  }
}

export { getFirebaseErrorMessage };
