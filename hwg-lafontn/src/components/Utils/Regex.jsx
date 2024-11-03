export const Regex = {
  userName: /^[a-zA-ZÀ-ÿ]{1}[a-zA-ZÀ-ÿ' \-]{1,21}[a-zA-ZÀ-ÿ]{1}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@&#$%]).{8,23}$/,
  phoneNumber: /^\+(?:\d{1,3})?\d{10,14}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
}