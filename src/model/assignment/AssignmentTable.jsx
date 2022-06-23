import React from 'react';

export default function AssignmentTable() {
  return (
    <div className="py-20">
      <div className="mx-auto  bg-white ">
        <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-center items-center lg:items-stretch w-full">
          <table className="w-full bg-white ">
            <thead>
              <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">
                <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  Assignement Title{' '}
                </th>

                <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  Assignment
                </th>
                <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  Students{' '}
                </th>

                <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  Date
                </th>
                <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  Grade{' '}
                </th>
                <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                  Add Grade{' '}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-24 border-gray-300 dark:border-gray-200 border-b">
                <td className="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                  Text
                </td>
                <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                  Text
                </td>

                <td className="pr-6 whitespace-no-wrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8">
                      <img
                        src="https://tuk-cdn.s3.amazonaws.com/assets/components/advance_tables/at_1.png"
                        alt="k"
                        className="h-full w-full rounded-full overflow-hidden shadow"
                      />
                    </div>
                    <p className="ml-2 text-gray-800 dark:text-gray-100 tracking-normal leading-4 text-sm">
                      Carrie Anthony
                    </p>
                  </div>
                </td>

                <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                  Date Text{' '}
                </td>
                <td className="pr-6">Text </td>
                <td className="pr-8 relative">
                  <button className="bg-black text-white p-4">Add</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
