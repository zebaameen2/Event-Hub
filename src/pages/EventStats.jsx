





// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import CsvDownloader from "react-csv-downloader";
// // import { supabase } from "../supabaseClient"; // 👈 IMPORT SUPABASE

// // export default function EventStats() {
// //   const { event } = useParams();

// //   const [docs, setDocs] = useState([]);
// //   const [eventData, setEventData] = useState(null);

// //   const callAPI = async (email, subject, message) => {
// //     try {
// //       await fetch("https://send-grid-api.vercel.app/sendemail", {
// //         method: "POST",
// //         body: JSON.stringify({ email, subject, message }),
// //         headers: { "content-type": "application/json" },
// //       });
// //     } catch (err) {
// //       console.log("Email API not running yet 🙂");
// //     }
// //   };

// //   const asyncFnComputeDate = () => {
// //     const data = docs.map((doc) => ({
// //       name: doc.name,
// //       email: doc.email,
// //     }));
// //     return Promise.resolve(data);
// //   };

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         // ✅ Fetch registrations for this event
// //         const { data: regData, error: regError } = await supabase
// //           .from("registrations")
// //           .select("*")
// //           .eq("event_id", event);

// //         if (regError) throw regError;
// //         setDocs(regData || []);

// //         // ✅ Fetch event info
// //         const { data: eventInfo, error: eventError } = await supabase
// //           .from("events")
// //           .select("*")
// //           .eq("id", event)
// //           .single();

// //         if (eventError) throw eventError;
// //         setEventData(eventInfo);
// //       } catch (err) {
// //         console.error("Error fetching stats:", err.message);
// //         setDocs([]);
// //       }
// //     };

// //     fetchData();
// //   }, [event]);

// //   const handleAcceptanceEmail = async (id, name, email) => {
// //     await supabase
// //       .from("registrations")
// //       .update({ confirm: "accept" })
// //       .eq("id", id);

// //     callAPI(
// //       email,
// //       "Accepted 🎉",
// //       `Hey ${name}, you are accepted for ${eventData?.eventname}`
// //     );
// //   };

// //   const handleRejectionEmail = async (id, name, email) => {
// //     await supabase
// //       .from("registrations")
// //       .update({ confirm: "reject" })
// //       .eq("id", id);

// //     callAPI(
// //       email,
// //       "Rejected",
// //       `Hey ${name}, you are rejected for ${eventData?.eventname}`
// //     );
// //   };

// //   return (
// //     <div className="flex justify-center w-full">
// //       <div className="w-full max-w-6xl px-6 py-10">
// //         <h1 className="text-3xl font-bold mb-8 text-center">
// //           Event Attendees
// //         </h1>

// //         <div className="overflow-x-auto">
// //           <table className="w-full bg-white shadow rounded-xl">
// //             <thead className="bg-gray-100">
// //               <tr>
// //                 <th className="p-3 text-left">Name</th>
// //                 <th className="text-left">Email</th>
// //                 <th className="text-center">Actions</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {docs.map((attendee) => (
// //                 <tr key={attendee.id} className="border-t">
// //                   <td className="p-3">{attendee.name}</td>
// //                   <td>{attendee.email}</td>

// //                   <td className="text-center space-x-2">
// //                     <button
// //                       className="bg-green-500 text-white px-4 py-1 rounded"
// //                       onClick={() =>
// //                         handleAcceptanceEmail(
// //                           attendee.id,
// //                           attendee.name,
// //                           attendee.email
// //                         )
// //                       }
// //                     >
// //                       Accept
// //                     </button>

// //                     <button
// //                       className="bg-red-500 text-white px-4 py-1 rounded"
// //                       onClick={() =>
// //                         handleRejectionEmail(
// //                           attendee.id,
// //                           attendee.name,
// //                           attendee.email
// //                         )
// //                       }
// //                     >
// //                       Reject
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>

// //         <div className="mt-8 flex justify-center">
// //           <CsvDownloader
// //             datas={asyncFnComputeDate}
// //             filename="registrations"
// //             text="Export CSV"
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import CsvDownloader from "react-csv-downloader";
// import { supabase } from "../supabaseClient"; // 👈 Supabase client

// export default function EventStats() {
//   const { event } = useParams();

//   const [docs, setDocs] = useState([]);
//   const [eventData, setEventData] = useState(null);

//   // ✅ Email API
//   const callAPI = async (email, subject, message) => {
//     try {
//       await fetch("https://send-grid-api.vercel.app/sendemail", {
//         method: "POST",
//         body: JSON.stringify({ email, subject, message }),
//         headers: { "content-type": "application/json" },
//       });
//     } catch (err) {
//       console.log("Email API not running yet 🙂");
//     }
//   };

//   // ✅ CSV Export
//   const asyncFnComputeDate = () => {
//     const data = docs.map((doc) => ({
//       name: doc.name,
//       email: doc.email,
//     }));
//     return Promise.resolve(data);
//   };

//   // ✅ Fetch registrations + event info
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (token) supabase.auth.setAuth(token); // attach JWT

//         const { data: regData, error: regError } = await supabase
//           .from("registrations")
//           .select("*")
//           .eq("event_id", event);

//         if (regError) throw regError;
//         setDocs(regData || []);

//         const { data: eventInfo, error: eventError } = await supabase
//           .from("events")
//           .select("*")
//           .eq("id", event)
//           .single();

//         if (eventError) throw eventError;
//         setEventData(eventInfo);
//       } catch (err) {
//         console.error("Error fetching stats:", err.message);
//         setDocs([]);
//       }
//     };

//     fetchData();
//   }, [event]);

//   // ✅ Accept attendee
//   const handleAcceptanceEmail = async (id, name, email) => {
//     const token = localStorage.getItem("token");
//     if (token) supabase.auth.setAuth(token);

//     await supabase.from("registrations").update({ confirm: "accept" }).eq("id", id);

//     callAPI(email, "Accepted 🎉", `Hey ${name}, you are accepted for ${eventData?.eventname}`);
//   };

//   // ✅ Reject attendee
//   const handleRejectionEmail = async (id, name, email) => {
//     const token = localStorage.getItem("token");
//     if (token) supabase.auth.setAuth(token);

//     await supabase.from("registrations").update({ confirm: "reject" }).eq("id", id);

//     callAPI(email, "Rejected", `Hey ${name}, you are rejected for ${eventData?.eventname}`);
//   };

//   return (
//     <div className="flex justify-center w-full">
//       <div className="w-full max-w-6xl px-6 py-10">
//         <h1 className="text-3xl font-bold mb-8 text-center">Event Attendees</h1>

//         <div className="overflow-x-auto">
//           <table className="w-full bg-white shadow rounded-xl">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left">Name</th>
//                 <th className="text-left">Email</th>
//                 <th className="text-center">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {docs.map((attendee) => (
//                 <tr key={attendee.id} className="border-t">
//                   <td className="p-3">{attendee.name}</td>
//                   <td>{attendee.email}</td>

//                   <td className="text-center space-x-2">
//                     <button
//                       className="bg-green-500 text-white px-4 py-1 rounded"
//                       onClick={() =>
//                         handleAcceptanceEmail(attendee.id, attendee.name, attendee.email)
//                       }
//                     >
//                       Accept
//                     </button>

//                     <button
//                       className="bg-red-500 text-white px-4 py-1 rounded"
//                       onClick={() =>
//                         handleRejectionEmail(attendee.id, attendee.name, attendee.email)
//                       }
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="mt-8 flex justify-center">
//           <CsvDownloader
//             datas={asyncFnComputeDate}
//             filename="registrations"
//             text="Export CSV"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CsvDownloader from "react-csv-downloader";

export default function EventStats() {
  const { event } = useParams();

  const [docs, setDocs] = useState([]);
  const [eventData, setEventData] = useState(null);

  // ✅ Email API
  const callAPI = async (email, subject, message) => {
    try {
      await fetch("https://send-grid-api.vercel.app/sendemail", {
        method: "POST",
        body: JSON.stringify({ email, subject, message }),
        headers: { "content-type": "application/json" },
      });
    } catch (err) {
      console.log("Email API not running yet 🙂");
    }
  };

  // ✅ CSV Export
  const asyncFnComputeDate = () => {
    const data = docs.map((doc) => ({
      name: doc.users?.name,
      email: doc.users?.email,
    }));
    return Promise.resolve(data);
  };

  // ✅ Fetch registrations + event info from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:5000/api/events/${event}/registrations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();

        if (result.success) {
          setDocs(result.registrations || []);
          setEventData(result.event || null);
        } else {
          setDocs([]);
        }
      } catch (err) {
        console.error("Error fetching stats:", err.message);
        setDocs([]);
      }
    };

    fetchData();
  }, [event]);

  // ✅ Accept attendee
  const handleAcceptanceEmail = async (id, name, email) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/registrations/${id}/accept`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    callAPI(email, "Accepted 🎉", `Hey ${name}, you are accepted for ${eventData?.eventname}`);
  };

  // ✅ Reject attendee
  const handleRejectionEmail = async (id, name, email) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/registrations/${id}/reject`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    callAPI(email, "Rejected", `Hey ${name}, you are rejected for ${eventData?.eventname}`);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Event Attendees</h1>

        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded-xl">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="text-left">Email</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {docs.map((attendee) => (
                <tr key={attendee.id} className="border-t">
                  <td className="p-3">{attendee.users?.name}</td>
                  <td>{attendee.users?.email}</td>

                  <td className="text-center space-x-2">
                    <button
                      className="bg-green-500 text-white px-4 py-1 rounded"
                      onClick={() =>
                        handleAcceptanceEmail(attendee.id, attendee.users?.name, attendee.users?.email)
                      }
                    >
                      Accept
                    </button>

                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded"
                      onClick={() =>
                        handleRejectionEmail(attendee.id, attendee.users?.name, attendee.users?.email)
                      }
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-center">
          <CsvDownloader
            datas={asyncFnComputeDate}
            filename="registrations"
            text="Export CSV"
          />
        </div>
      </div>
    </div>
  );
}
