// 'use client';

// import axios from 'axios';
// import { FcGoogle } from 'react-icons/fc';
// import { signIn } from 'next-auth/react';
// import { useCallback, useState } from 'react';
// import { toast } from 'react-hot-toast';
// import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

// import useLoginModal from '@/hooks/useLoginModal';
// import useRegisterModal from '@/hooks/useRegisterModal';

// import Modal from '@/components/modals/modals-modal';
// import Heading from '@/components/heading';
// import Input from '@/components/inputs/input';
// import Button from '@/components//button';
// import { Separator } from '@/components/ui/separator';

// const RegisterModal = () => {
//   const registerModal = useRegisterModal();
//   const loginModal = useLoginModal();
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FieldValues>({
//     defaultValues: {
//       name: '',
//       email: '',
//       password: '',
//     },
//   });

//   const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     setIsLoading(true);

//     axios
//       .post('/api/register', data)
//       .then(() => {
//         toast.success('Registered!');
//         registerModal.onClose();
//         loginModal.onOpen();
//       })
//       .catch((error) => {
//         toast.error(error);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   const onToggle = useCallback(() => {
//     registerModal.onClose();
//     loginModal.onOpen();
//   }, [registerModal, loginModal]);

//   const bodyContent = (
//     <div className="flex flex-col gap-4">
//       <Heading title="Welcome to my Portfolio" subtitle="Create an account!" />
//       <Input
//         id="email"
//         label="Email"
//         disabled={isLoading}
//         register={register}
//         errors={errors}
//         required
//       />
//       <Input
//         id="name"
//         label="Name"
//         disabled={isLoading}
//         register={register}
//         errors={errors}
//         required
//       />
//       <Input
//         id="password"
//         label="Password"
//         type="password"
//         disabled={isLoading}
//         register={register}
//         errors={errors}
//         required
//       />
//     </div>
//   );

//   const footerContent = (
//     <div className="flex flex-col gap-4 mt-3">
//       <Separator />
//       <Button
//         outline
//         label="Continue with Google"
//         icon={FcGoogle}
//         onClick={() => signIn('google')}
//       />
//       <div
//         className="
//           text-neutral-500
//           text-center
//           mt-4
//           font-light
//         "
//       >
//         <p className="dark:text-white">
//           Already have an account?
//           <span
//             onClick={onToggle}
//             className="
//               text-neutral-800
//               cursor-pointer
//               hover:underline
//               dark:text-white
//             "
//           >
//             Log in
//           </span>
//         </p>
//       </div>
//     </div>
//   );

//   return (
//     <Modal
//       disabled={isLoading}
//       isOpen={registerModal.isOpen}
//       title="Register"
//       actionLabel="Continue"
//       onClose={registerModal.onClose}
//       onSubmit={handleSubmit(onSubmit)}
//       body={bodyContent}
//       footer={footerContent}
//     />
//   );
// };

// export default RegisterModal;
