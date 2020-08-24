<template>
    <div>
        <div class="form-group mb-5">
            <textarea
                class="p-2 col"
                type="text"
                id="content"
                required
                placeholder="Commentez..."
            />
            <BaseButton class="float-right"> Envoyer </BaseButton>
        </div>
    </div>
</template>

<script>
import BaseButton from "../components/BaseButton"

export default {
    name: "AddComment",
    components: {
        BaseButton
    }
}
</script>

<style lang="scss">
    textarea{
        border: black 2px solid;
        box-shadow: none;
        height: 100px;
    } 
</style> 