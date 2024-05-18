import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useParticipants from "../../hooks/useParticipants";

const EventRegistration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { eventId } = useParams();
  const { addParticipant } = useParticipants({ eventId });

  const onSubmit = (data) => {
    console.log(data); // You can submit data to the backend here
    addParticipant({ ...data, eventId });
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Event Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block font-semibold mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            {...register("fullName", { required: true })}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
          {errors.fullName && (
            <span className="text-red-500">Full Name is required</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
          {errors.email && (
            <span className="text-red-500">Email is required</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="dateOfBirth" className="block font-semibold mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            {...register("dateOfBirth", { required: true })}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
          {errors.dateOfBirth && (
            <span className="text-red-500">Date of Birth is required</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Where did you hear about this event?
          </label>
          <div className="flex">
            <div className="mr-4">
              <input
                type="radio"
                id="socialMedia"
                value="Social Media"
                {...register("referralSource")}
                className="mr-2"
              />
              <label htmlFor="socialMedia" className="mr-2">
                Social Media
              </label>
            </div>
            <div className="mr-4">
              <input
                type="radio"
                id="friends"
                value="Friends"
                {...register("referralSource")}
                className="mr-2"
              />
              <label htmlFor="friends" className="mr-2">
                Friends
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="foundMyself"
                value="Found Myself"
                {...register("referralSource")}
                className="mr-2"
              />
              <label htmlFor="foundMyself" className="mr-2">
                Found Myself
              </label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default EventRegistration;
