import axios from "axios";
import {BACKEND_URL} from './guitarConstants';
const API_URL = '/api/guitars'

export const getGuitars = () => axios.get(`${BACKEND_URL}${API_URL}`);