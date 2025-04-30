import { supabase } from "./supabaseClient";

export const register = async (email: string, password: string, name: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error || !data.user) throw new Error(error?.message || "Erro no signUp");

    const user = data.user;

    const { error: insertError } = await supabase
      .from("users")
      .insert([{ id: user.id, name, email, role: "vendedor" }]);

    if (insertError) throw new Error("Erro ao inserir no banco: " + insertError.message);

    return user;
  } catch (err: any) {
    throw new Error(err.message || "Erro ao registrar.");
  }
};


export const login = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    const { user, session } = data;
    if (!user || !session) throw new Error("Falha no login.");

    localStorage.setItem("token", session.access_token);
    localStorage.setItem("user", JSON.stringify(user));

    return { user, token: session.access_token };
  } catch (err: any) {
    throw new Error(err.message || "Erro ao fazer login.");
  }
};


export const logout = async () => {
  await supabase.auth.signOut();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
