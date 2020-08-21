<template>
    <div>
        <LargeCurrentUser class="mb-4" />

        <div class="m-3">
            <div class="form-group">
                <label for="title">Titre:</label>
                <input
                    type="text"
                    id="title"
                    required
                />
            </div>

            <div class="form-group">
                <label for="content">Texte:</label>
                <textarea
                    type="text"
                    id="content"
                    required
                />
            </div>
        </div>

        <div class="text-center">
            <BaseButton class="col-6 m-4"> Ajouter une image </BaseButton>
            <BaseButton class="col-6 m-4"> Publier </BaseButton>
        </div>
        
        <ReturnButton />
        
    </div>
</template>

<script>
import LargeCurrentUser from "../components/LargeCurrentUser"
import ReturnButton from "../components/ReturnButton"
import BaseButton from "../components/BaseButton"

export default {
    name: "createArticle",
    components: {
        LargeCurrentUser,
        ReturnButton,
        BaseButton
    }
}
</script>

<style lang="scss">
    .form-group{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
    input, textarea{
        border-radius: 5px;
        background-color: #FFD7D7;
        border: #FD2D01 1px solid;
        box-shadow: none;
        width: 100%;
    }
    textarea{
        height: 300px;
    }
</style>