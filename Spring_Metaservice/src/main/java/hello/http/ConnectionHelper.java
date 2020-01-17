package hello.http;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;
import java.util.LinkedList;
import java.util.List;


public class ConnectionHelper {
    private URL url = null;
    private HttpURLConnection conn = null;

    public ConnectionHelper(URL url) {
        this.url = url;
    }

    public List<String> get() {
        return this.get((String[]) null);
    }

    /**
     * Fetches data from rest api.
     * @return All fetched data. Returns null if an exception occurred.
     */
    public List<String> get(String...param) {
        BufferedReader br = null;
        List<String> list = new LinkedList<>();
        String line;
        try {
            URL urlWithParams;
            if(param != null) {
                StringBuilder builder = new StringBuilder();
                for(int i = 0;i<param.length;i++) {
                    builder.append(param[i]);
                }
                System.out.print(url.toString()+builder.toString());
                urlWithParams = new URL(url.toString()+builder.toString());
            } else {
                urlWithParams = url;
            }

            /*
             *
             */
            conn = (HttpURLConnection) urlWithParams.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
			/*
			if(conn.getResponseCode() != 200) {
				throw new RuntimeException("Failed with code: " + conn.getResponseCode());
			}
			*/

            br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            while((line = br.readLine()) != null) {
                list.add(line);
            }
        } catch (RuntimeException e) {
            e.printStackTrace();
        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if(br != null) {
                try {br.close();} catch (IOException e) {e.printStackTrace();}
            }
            conn.disconnect();
        }
        return list;
    }

    /**
     * Sends content data to rest Api.
     * @param content
     * @return if method was successful.
     */
    public List<String> post(String content) {
        OutputStream os = null;
        List<String> lines = new LinkedList<>();
        try {
            conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");

            os = conn.getOutputStream();
            os.write(content.getBytes());
            os.flush();

			/*
			if(conn.getResponseCode() != 200) {
				throw new RuntimeException("Failed with code: " + conn.getResponseCode());
			}
			*/

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line;
            while((line = br.readLine()) != null) {
                lines.add(line);
            }
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (RuntimeException e) {
            e.printStackTrace();
        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {os.close();} catch (IOException e) {e.printStackTrace();}
            conn.disconnect();
        }
        return lines;
    }
}