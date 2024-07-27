import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Header from '../../Components/Header/Header';
import SideBar from '../../Components/Sidebar/Sidebar';
import styles from './Services.module.css';
import { useParams,useNavigate } from 'react-router-dom';
import back from '../../assets/backArrow@.png';

const UploadServices = () => {
  const [servicesData, setServicesData] = useState([]);
  const [error, setError] = useState(null);
    const {id} = useParams();
    console.log(id);
  const requiredFields = [
    'ServiceName',
    'ServiceType',
    'ServiceCost',
    'ServiceTime',
    'ServiceGender',
  ];

  const navigate = useNavigate();

  const validateData = (data) => {
    for (const item of data) {
      for (const field of requiredFields) {
        if (!item[field]) {
          return `Missing required field: ${field}`;
        }
      }
      if (typeof item.ServiceCost !== 'number' || item.ServiceCost <= 0) {
        return 'ServiceCost must be a positive number';
      }
      if (typeof item.ServiceTime !== 'number' || item.ServiceTime <= 0) {
        return 'ServiceTime must be a positive number';
      }
      if (!['Male', 'Female', 'Both'].includes(item.ServiceGender)) {
        return 'ServiceGender must be Male, Female, or Both';
      }
    }
    return null;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const errorMsg = validateData(jsonData);
      if (errorMsg) {
        setError(errorMsg);
        setServicesData([]);
      } else {
        setError(null);
        setServicesData(jsonData);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async () => {
    if (error) {
      alert('Please correct the errors before submitting.');
      return;
    }

    console.log(servicesData);  
    fetch(`https://api.salondekho.in/api/service/create-service-by-excel/${id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(servicesData),
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.success){
                alert(data.message);
                setServicesData([]);
            }
        })
        .catch((err) => {
            console.log(err);
            alert('Something went wrong'+err);
        });
  };

  return (
    <div className={styles.main}>
        <Header />
        <SideBar />
    <div className={styles.services}>
        <div style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '20px',
        }}>
            <img src={back} style={{
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                marginTop: '5px',
            }} alt="back" onClick={() => navigate(-1)} />
      <h1>Upload Services Excel</h1>
        </div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleSubmit} disabled={!servicesData.length}>Submit</button>
      {servicesData.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              {requiredFields.map(field => (
                <th key={field}>{field}</th>
            ))}
            </tr>
          </thead>
          <tbody>
            {servicesData.map((service, index) => (
                <tr key={index}>
                {requiredFields.map(field => (
                    <td key={field}>{service[field]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </div>
  );
};

export default UploadServices;
