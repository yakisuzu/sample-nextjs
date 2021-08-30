module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["@typescript-eslint"],
  settings: {
    react: {
      version: "detect"
    }
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "plugin:jest/recommended",
  ],
  rules: {
    // 空の関数禁止
    // => contextの初期関数などで使う
    "@typescript-eslint/no-empty-function": "off",
    // anyからの変換禁止
    // => anyを使う
    "@typescript-eslint/no-unsafe-assignment": "off",
    // anyの利用禁止
    // => anyを使う
    "@typescript-eslint/no-unsafe-member-access": "off",
    // anyの宣言禁止
    // => anyを使う
    "@typescript-eslint/no-explicit-any": "off",
    // async宣言したらawait必須
    // => getStaticPropsでasync必須ため
    "@typescript-eslint/require-await": "off",
    // 異なるスコープでのthisを禁止
    // => 使ってないのにカスタムフックの利用で出ることがある
    "@typescript-eslint/unbound-method": "off",
    // 未使用の変数は禁止
    // => 関数の引数は宣言だけすることがある
    "@typescript-eslint/no-unused-vars": ["error", {"args": "none"}],
  }
};