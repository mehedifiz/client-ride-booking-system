import { useGetTestQuery } from "@/redux/features/test";

const Register = () => {
  const { data, error, isLoading } = useGetTestQuery(undefined);  // 👈 call here

  return (
    <div>
     regis 
    </div>
  );
};

export default Register;
