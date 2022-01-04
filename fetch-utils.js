const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createCharacter(character){
    const user = await getUser();
    const response = await client
        .from('characters')
        .insert({ 
            ...character, 
            user_id: user.user.id, 
        })
        .single();

    checkError(response);
}

/*
CHALLENGE: how would you use this function? which functions would it replace? what's going on with the brackets in the update() arguments?
export async function updateCharacter(part, value){
    const currentUserId = client.auth.user().id;

    const response = await client
        .from('characters')
        .update({ [part]: value })
        .match({ user_id: currentUserId });

    return checkError(response);    
}
*/

export async function updateHead(value){
    const user = await getUser();

    const response = await client
        .from('characters')
        .update({ head: value })
        .match({ user_id: user.user.id })
        .single();

    return checkError(response);    
}


export async function updateMiddle(value){
    const user = await getUser();

    const response = await client
        .from('characters')
        .update({ middle: value })
        .match({ user_id: user.user.id })
        .single();

    return checkError(response);    
}


export async function updateBottom(value){
    const user = await getUser();

    const response = await client
        .from('characters')
        .update({ bottom: value })
        .match({ user_id: user.user.id })
        .single();

    return checkError(response);    
}

export async function updateCatchphrases(value){
    const user = await getUser();

    const response = await client
        .from('characters')
        .update({ catchphrases: value })
        .match({ user_id: user.user.id });
        console.log(response);

    return checkError(response);    
}


export async function updateCharacter(part, value){
    const user = await getUser();

    const response = await client
        .from('characters')
        .update({ [part]: value })
        .match({ user_id: user.user.id });

    return checkError(response);    
}
export async function getCatchPhrase(){
    const newCatchPhrase = await client
        .from('characters')
        .select('catchphrases');

    return newCatchPhrase;
}

export async function getCharacter() {
    const response = await client
        .from('characters')
        .select()
        .match({ user_id: client.auth.user().id, })
        .single();
      

    checkError(response);    
}

export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectToBuild() {
    if (await getUser()) {
        location.replace('./build');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return checkError(response);
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return checkError(response);
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '/';
}

function checkError({ data, error }) {
    return error ? console.log(error) : data;
}

