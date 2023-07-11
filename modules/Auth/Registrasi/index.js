import { useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import registrasi from "./api/registrasi";
import FormRegistrasi1 from "./components/FormRegistrasi1";
import FormRegistrasi2 from "./components/FormRegistrasi2";

const Registrasi = () => {
  const router = useRouter();
  const toast = useToast();

  const [formRegistrasi, setFormRegistrasi] = useState(true);

  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [unit, setUnit] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setDisabled(true);

    const data = await registrasi(
      nama.toUpperCase(),
      Number(nik),
      Number(unit),
      email,
      password,
      confPassword
    ).then((res) => {
      try {
        if (res.status == 200 && res.message === "Silahkan verifikasi email") {
          setIsLoading(false);
          setDisabled(false);
          Cookies.set("email", email, { expires: 1 });
          router.push("/verifyemail");
          toast({
            title: "Verifikasi Email!",
            description: "Silahkan verifikasi email",
            status: "success",
            duration: 5000,
            position: "top",
            isClosable: true,
          });
        }

        if (res.status == 400 && res.message === "NIK already exist") {
          setIsLoading(false);
          setDisabled(false);
          toast({
            title: "Registrasi Gagal!",
            description: "NIK sudah ada",
            status: "error",
            duration: 5000,
            position: "top",
            isClosable: true,
          });
        }

        if (res.status == 400 && res.message === "Email already exist") {
          setIsLoading(false);
          setDisabled(false);
          toast({
            title: "Registrasi Gagal!",
            description: "Email sudah ada",
            status: "error",
            duration: 5000,
            position: "top",
            isClosable: true,
          });
        }

        setIsLoading(false);
        setDisabled(false);
      } catch (error) {
        setIsLoading(false);
        setDisabled(false);
      }
    });
  };

  return formRegistrasi ? (
    <FormRegistrasi1
      setFormRegistrasi={setFormRegistrasi}
      setNama={setNama}
      nama={nama}
      setNik={setNik}
      nik={nik}
      setUnit={setUnit}
      unit={unit}
    />
  ) : (
    <FormRegistrasi2
      setFormRegistrasi={setFormRegistrasi}
      setEmail={setEmail}
      email={email}
      setPassword={setPassword}
      password={password}
      setConfPassword={setConfPassword}
      confPassword={confPassword}
      isLoading={isLoading}
      handleRegister={handleRegister}
      disabled={disabled}
      setDisabled={setDisabled}
    />
  );
};

export default Registrasi;
