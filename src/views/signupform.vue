<template>
    <div>
        <h1>登入</h1>
        <form @submit.prevent="handleSubmit">
            <label>帳號:</label>
            <input type="text" required v-model="帳號">
            <label>密碼:</label>
            <input type="password" required v-model="密碼">
            <div v-if="passwordError" class="error">{{ passwordError }}</div>

            <div class="terms">
                <input type="checkbox" v-model="terms" required>
                <label>同意所有條款</label>
            </div>

            <div class="submit">
                <router-link :to="{ name: 'lobby' }"><button type="submit">確認</button></router-link>
            </div>
        </form>

        <p>帳號: {{ 帳號 }}</p>
        <p>密碼: {{ 密碼 }}</p>
        <p>Terms accept: {{ terms }}</p>


    </div>
</template>

<script>
export default {
    data() {
        return {
            帳號: '',
            密碼: '',
            terms: false,
            passwordError: '',
        };
    },

    handleSubmit() {
        this.passwordError = this.密碼.length > 5 ? '' : '密碼至少需要6個字元';

        if (!this.passwordError) {
            console.log('帳號:', this.帳號);
            console.log('密碼:', this.密碼);
            console.log('terms accepted:', this.terms);
        }
    },
};
</script>

<style scoped>
h1 {
    color: black;
}

form {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}

label {
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 1.2em;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: bold;
}

input,
select {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
}

input[type="checkbox"] {
    display: inline-block;
    width: 16px;
    margin: 0 10px 0 0;
    position: relative;
    top: 2px;
}

button {
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
}

.submit {
    text-align: center;
}

.error {
    color: #ff0062;
    margin-top: 10px;
    font-size: 0.8em;
    font-weight: bold;
}</style>